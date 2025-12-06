import {
  buildModelFeatures,
  computeWaitFromAggregates,
  computeWaitFromQueueArray,
  processingSlotFromKilos,
} from "../../backend/src/utils/waschexpress";
import { predictWithModel } from "../../backend/src/api/predict";

describe("processingSlotFromKilos", () => {
  it("maps minimum kilos to 60", () => {
    expect(processingSlotFromKilos(0.5)).toBe(60);
  });

  it("maps maximum kilos to 150", () => {
    expect(processingSlotFromKilos(35)).toBe(150);
  });

  it("interpolates linearly at midpoint", () => {
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

  it("computes wait from queue array", () => {
    const wait = computeWaitFromQueueArray(sampleQueue, 2, 1);
    expect(wait).toBe(130);
  });

  it("computes wait from aggregates", () => {
    const wait = computeWaitFromAggregates(10, 95, 30, 1);
    expect(wait).toBe(Math.ceil(10 * 95 + 30));
  });
});

describe("buildModelFeatures", () => {
  it("uses queue details when provided", () => {
    const queue = [
      { kilos: 10, remaining_minutes: 30 },
      { kilos: 8 },
    ];

    const features = buildModelFeatures({
      kilos: 8.5,
      serviceType: "regular",
      weather: "rainy",
      queue,
      queueLength: 2,
      parallelWorkers: 1,
    });

    expect(features).toMatchObject({
      kilos: 8.5,
      service_type: "regular",
      weather: "rainy",
      processing_slot_min: expect.any(Number),
      wait_min: expect.any(Number),
    });
    expect(typeof features.wait_min).toBe("number");
  });

  it("falls back to aggregates when queue missing", () => {
    const features = buildModelFeatures({
      kilos: 5,
      serviceType: "express",
      weather: "sunny",
      queueLength: 3,
      avgProcessingSlot: 80,
      currentJobRemaining: 20,
      parallelWorkers: 2,
    });

    expect(features.wait_min).toBe(
      computeWaitFromAggregates(3, 80, 20, 2)
    );
  });
});

describe("predictWithModel", () => {
  const features = {
    kilos: 8.5,
    service_type: "regular" as const,
    weather: "rainy",
    processing_slot_min: 95,
    wait_min: 1320,
  };

  it("posts features and returns total_time_min", async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ total_time_min: 1880 }),
    });

    const result = await predictWithModel(features, {
      endpoint: "http://localhost:4001/predict",
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    expect(result).toBe(1880);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("http://localhost:4001/predict");
    expect(JSON.parse((options as any).body)).toEqual(features);
  });

  it("retries once on failure then succeeds", async () => {
    const fetchMock = jest
      .fn()
      .mockRejectedValueOnce(new Error("network"))
      .mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ total_time_min: 10 }),
      });

    const result = await predictWithModel(features, {
      fetchImpl: fetchMock as unknown as typeof fetch,
    });

    expect(result).toBe(10);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
