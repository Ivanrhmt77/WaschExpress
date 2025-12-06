const {
  processingSlotFromKilos,
  estimateJobProcessing,
  computeWaitFromQueueArray,
  computeWaitFromAggregates,
} = require("../utils/featureBuilder");

describe("processingSlotFromKilos", () => {
  it("maps min kilos to 60", () => {
    expect(processingSlotFromKilos(0.5)).toBe(60);
  });

  it("maps max kilos to 150", () => {
    expect(processingSlotFromKilos(35)).toBe(150);
  });

  it("interpolates midpoint", () => {
    const mid = processingSlotFromKilos(17.75);
    expect(mid).toBeGreaterThanOrEqual(104);
    expect(mid).toBeLessThanOrEqual(106);
  });
});

describe("wait calculations", () => {
  const sampleQueue = [
    { kilos: 15, remaining_minutes: 40 },
    { kilos: 12 },
    { kilos: 9, remaining_minutes: 0 },
    { kilos: 20 },
  ];

  it("uses remaining_minutes when present", () => {
    expect(estimateJobProcessing({ kilos: 10, remaining_minutes: 25 })).toBe(25);
  });

  it("computes wait from queue array", () => {
    const wait = computeWaitFromQueueArray(sampleQueue, 2, 1);
    expect(wait).toBe(130);
  });

  it("computes wait from aggregates", () => {
    const wait = computeWaitFromAggregates(10, 95, 30, 1);
    expect(wait).toBe(Math.ceil(10 * 95 + 30));
  });
});
