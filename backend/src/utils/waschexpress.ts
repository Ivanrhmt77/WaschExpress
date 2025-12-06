export type ServiceType = "regular" | "express";

export type Job = {
  kilos: number;
  service_type?: ServiceType;
  remaining_minutes?: number;
};

export type BuildParams = {
  kilos: number;
  serviceType: ServiceType;
  weather: string;
  queue?: Job[];
  queueLength?: number;
  avgProcessingSlot?: number;
  currentJobRemaining?: number;
  parallelWorkers?: number;
};

export type ModelFeatures = {
  kilos: number;
  service_type: ServiceType;
  weather: string;
  processing_slot_min: number;
  wait_min: number;
};

const MIN_KILOS = 0.5;
const MAX_KILOS = 35.0;
const MIN_SLOT = 60;
const MAX_SLOT = 150;

/**
 * Map load (kg) to processing minutes via linear interpolation and clamp to domain.
 */
export function processingSlotFromKilos(kilos: number): number {
  const k = Math.min(Math.max(kilos, MIN_KILOS), MAX_KILOS);
  const ratio = (k - MIN_KILOS) / (MAX_KILOS - MIN_KILOS);
  const slot = MIN_SLOT + ratio * (MAX_SLOT - MIN_SLOT);
  return Math.round(slot);
}

/**
 * Estimate total minutes for a job using remaining_minutes when provided, otherwise derived from kilos.
 */
export function estimateJobProcessing(job: Job): number {
  if (typeof job.remaining_minutes === "number") {
    return job.remaining_minutes;
  }
  return processingSlotFromKilos(job.kilos);
}

/**
 * Compute wait minutes from a detailed queue (oldest first).
 */
export function computeWaitFromQueueArray(
  queue: Job[],
  queueLength: number,
  parallelWorkers: number = 1
): number {
  const effectiveWorkers = Math.max(1, parallelWorkers);
  const cappedLength = Math.max(0, Math.min(queueLength, queue.length));
  if (cappedLength === 0) return 0;

  const total = queue.slice(0, cappedLength).reduce((sum, job) => {
    return sum + estimateJobProcessing(job);
  }, 0);

  return Math.ceil(total / effectiveWorkers);
}

/**
 * Compute wait minutes when only aggregate queue info is available.
 */
export function computeWaitFromAggregates(
  queueLength: number,
  avgProcessingSlot: number,
  currentJobRemaining: number = 0,
  parallelWorkers: number = 1
): number {
  const effectiveWorkers = Math.max(1, parallelWorkers);
  const gross = queueLength * avgProcessingSlot + currentJobRemaining;
  if (gross <= 0) return 0;
  return Math.ceil(gross / effectiveWorkers);
}

/**
 * Build the full model feature payload, preferring queue details when available.
 */
export function buildModelFeatures(params: BuildParams): ModelFeatures {
  const {
    kilos,
    serviceType,
    weather,
    queue,
    queueLength,
    avgProcessingSlot,
    currentJobRemaining,
    parallelWorkers,
  } = params;

  const processing_slot_min = processingSlotFromKilos(kilos);

  let wait_min = 0;

  if (queue && queue.length > 0) {
    const effectiveQueueLength =
      typeof queueLength === "number" ? queueLength : queue.length;
    wait_min = computeWaitFromQueueArray(
      queue,
      Math.max(0, effectiveQueueLength),
      parallelWorkers
    );
  } else if (typeof queueLength === "number" && typeof avgProcessingSlot === "number") {
    wait_min = computeWaitFromAggregates(
      Math.max(0, queueLength),
      Math.max(0, avgProcessingSlot),
      Math.max(0, currentJobRemaining ?? 0),
      parallelWorkers
    );
  } else {
    wait_min = 0;
  }

  return {
    kilos,
    service_type: serviceType,
    weather,
    processing_slot_min,
    wait_min,
  };
}
