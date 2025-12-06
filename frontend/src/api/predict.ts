import type { ModelFeatures } from "../utils/waschexpress";

const DEFAULT_ENDPOINT = "/predict";
const INITIAL_BACKOFF_MS = 200;
const MAX_RETRIES = 1;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type PredictOptions = {
  endpoint?: string;
  fetchImpl?: typeof fetch;
};

/**
 * Call the TF.js-serving endpoint with model features and return predicted total time in minutes.
 */
export async function predictWithModel(
  features: ModelFeatures,
  options: PredictOptions = {}
): Promise<number> {
  const endpoint = options.endpoint ?? DEFAULT_ENDPOINT;
  const fetchImpl = options.fetchImpl ?? fetch;

  let lastError: unknown;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const res = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(features),
      });

      if (!res.ok) {
        throw new Error(`Prediction request failed with status ${res.status}`);
      }

      const data = (await res.json()) as { total_time_min?: number };
      if (typeof data.total_time_min !== "number") {
        throw new Error("Prediction response missing total_time_min");
      }

      return data.total_time_min;
    } catch (error) {
      lastError = error;
      if (attempt < MAX_RETRIES) {
        const delay = INITIAL_BACKOFF_MS * Math.pow(2, attempt);
        await sleep(delay);
        continue;
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Prediction request failed");
}
