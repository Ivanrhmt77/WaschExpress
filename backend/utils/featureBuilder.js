/**
 * @typedef {"regular" | "express"} ServiceType
 * @typedef {{ kilos: number; service_type?: ServiceType; remaining_minutes?: number }} Job
 */

const MIN_KILOS = 0.5;
const MAX_KILOS = 35.0;
const MIN_SLOT = 60;
const MAX_SLOT = 150;

/**
 * Map load (kg) to processing minutes via linear interpolation and clamp to domain.
 * @param {number} kilos
 * @returns {number}
 */
function processingSlotFromKilos(kilos) {
  const k = Math.min(Math.max(kilos, MIN_KILOS), MAX_KILOS);
  const ratio = (k - MIN_KILOS) / (MAX_KILOS - MIN_KILOS);
  const slot = MIN_SLOT + ratio * (MAX_SLOT - MIN_SLOT);
  return Math.round(slot);
}

/**
 * Estimate minutes for a job using remaining_minutes if provided; otherwise derive from kilos.
 * @param {Job} job
 * @returns {number}
 */
function estimateJobProcessing(job) {
  if (typeof job.remaining_minutes === "number") {
    return job.remaining_minutes;
  }
  return processingSlotFromKilos(job.kilos);
}

/**
 * Compute wait minutes from a detailed queue (oldest first).
 * @param {Job[]} queue
 * @param {number} queueLength how many jobs ahead of the new arrival
 * @param {number} [parallelWorkers=1]
 * @returns {number}
 */
function computeWaitFromQueueArray(queue, queueLength, parallelWorkers = 1) {
  const effectiveWorkers = Math.max(1, parallelWorkers);
  const cappedLength = Math.max(0, Math.min(queueLength, queue.length));
  if (cappedLength === 0) return 0;

  const total = queue.slice(0, cappedLength).reduce((sum, job) => sum + estimateJobProcessing(job), 0);
  return Math.ceil(total / effectiveWorkers);
}

/**
 * Compute wait minutes when only aggregate queue info is available.
 * @param {number} queueLength
 * @param {number} avgProcessingSlot
 * @param {number} [currentJobRemaining=0]
 * @param {number} [parallelWorkers=1]
 * @returns {number}
 */
function computeWaitFromAggregates(queueLength, avgProcessingSlot, currentJobRemaining = 0, parallelWorkers = 1) {
  const effectiveWorkers = Math.max(1, parallelWorkers);
  const gross = queueLength * avgProcessingSlot + currentJobRemaining;
  if (gross <= 0) return 0;
  return Math.ceil(gross / effectiveWorkers);
}

module.exports = {
  processingSlotFromKilos,
  estimateJobProcessing,
  computeWaitFromQueueArray,
  computeWaitFromAggregates,
};
