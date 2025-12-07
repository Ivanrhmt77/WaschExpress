// This is an AI flow that estimates the order completion time for a laundry service, considering workload and weather.

"use server";

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const AiSmartPredictionInputSchema = z.object({
  serviceType: z.string().describe("The type of laundry service selected."),
  quantity: z
    .number()
    .describe("The quantity of items for the selected service."),
  isExpress: z
    .boolean()
    .optional()
    .describe("Whether the laundry service is express or not"),
});
export type AiSmartPredictionInput = z.infer<
  typeof AiSmartPredictionInputSchema
>;

const AiSmartPredictionOutputSchema = z.object({
  estimatedCompletionTime: z
    .string()
    .describe(
      "The estimated completion time for the laundry order in 'YYYY-MM-DD HH:mm:ss' format."
    ),
  weatherCondition: z.string().describe("The current weather condition."),
  priority: z
    .string()
    .optional()
    .describe("PRIORITAS TINGGI if express service"),
});
export type AiSmartPredictionOutput = z.infer<
  typeof AiSmartPredictionOutputSchema
>;

export async function getSmartPrediction(
  input: AiSmartPredictionInput
): Promise<AiSmartPredictionOutput> {
  return aiSmartPredictionFlow(input);
}

const smartPredictionPrompt = ai.definePrompt({
  name: "smartPredictionPrompt",
  input: { schema: AiSmartPredictionInputSchema },
  output: { schema: AiSmartPredictionOutputSchema },
  prompt: `You are a smart AI assistant for a laundry service. You estimate the order completion time based on the service type, quantity, and current weather conditions. The current date and time is ${new Date().toISOString()}.

Service Type: {{{serviceType}}}
Quantity: {{{quantity}}}
Is Express: {{#if isExpress}}Yes{{else}}No{{/if}}

Consider the following factors:
* Workload: Assume a higher quantity of items means a longer completion time. A standard item takes about 2 hours.
* Weather: Rainy weather might delay drying and increase completion time by 1-2 hours.
* Express Service: Express service orders should have a faster completion time and a PRIORITAS TINGGI badge. Regular service takes 24-48 hours. Express service takes 3-6 hours.

Provide the estimated completion time in 'YYYY-MM-DD HH:mm:ss' format, the weather condition, and add 'PRIORITAS TINGGI' to the priority if it is an express service.

Output should be in Indonesian for weatherCondition and priority, but the time must be in 'YYYY-MM-DD HH:mm:ss' format.`,
});

const aiSmartPredictionFlow = ai.defineFlow(
  {
    name: "aiSmartPredictionFlow",
    inputSchema: AiSmartPredictionInputSchema,
    outputSchema: AiSmartPredictionOutputSchema,
  },
  async (input) => {
    const { output } = await smartPredictionPrompt(input);
    return output!;
  }
);
