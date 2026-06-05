// pokecache.ts
// A simple in-memory cache implementation with a background reaper loop to evict stale entries based on a configurable time-to-live interval.

export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

/**
 * A flexible, generic in-memory cache system equipped with an automated
 * background reaper loop to evict stale entries past a specified time-to-live.
 */
export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  /**
   * Constructs a new cache instance and immediately initiates its background eviction loop.
   * @param interval - The maximum age of an entry in milliseconds before eviction
   */
  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  /**
   * Inserts or overrides a generic value in the cache under a specific key,
   * stamping it with the current timestamp.
   * @param key - The lookup string key (typically a request URL)
   * @param val - The data object to cache
   */
  add<T>(key: string, val: T): void {
    this.#cache.set(key, {
      createdAt: Date.now(),
      val: val,
    });
  }

  /**
   * Retrieves a live value from the cache if it exists.
   * @param key - The lookup string key
   * @returns The cached value generic object, or undefined if missing/evicted
   */
  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    if (entry === undefined) {
      return undefined;
    }
    return entry.val as T;
  }

  /**
   * Stops the background reaper timer cleanly and sets the tracking ID to undefined.
   */
  stopReapLoop(): void {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }

  /**
   * Iterates through all internal cache entries and removes any item whose
   * age exceeds the configured interval threshold.
   */
  #reap(): void {
    const threshold = Date.now() - this.#interval;
    for (const [key, entry] of this.#cache.entries()) {
      if (entry.createdAt < threshold) {
        this.#cache.delete(key);
      }
    }
  }

  /**
   * Spawns the background intervals to execute the internal eviction reaper routine.
   */
  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }
}