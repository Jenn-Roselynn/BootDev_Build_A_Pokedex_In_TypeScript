// pokecache.test.ts
// Unit tests for the Cache class, verifying that items are stored, retrieved, and evicted correctly based on the specified time interval.

import { test, expect } from "vitest";
import { Cache } from "./pokecache.js";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  // Verify item is added and instantly readable from memory
  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  // Wait long enough for the background reaper loop to kick in and evict it, plus a tiny 50ms buffer
  await new Promise((resolve) => setTimeout(resolve, (interval * 2) + 50));
  
  // Verify that the stale record was swept away automatically
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  // Clean up our timer so the test process finishes gracefully
  cache.stopReapLoop();
});