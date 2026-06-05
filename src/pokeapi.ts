// pokeapi.ts
// This module defines the PokeAPI class, which provides methods to interact with the PokeAPI endpoints related to location areas.

import { Cache } from "./pokecache.js";

export type ShallowLocationResult = {
  name: string;
  url: string;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShallowLocationResult[];
};

export type Location = {
  id: number;
  name: string;
  game_indices: unknown[];
  encounter_method_rates: unknown[];
  location: {
    name: string;
    url: string;
  };
  names: unknown[];
  pokemon_encounters: unknown[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(5 * 60 * 1000);

  constructor() {}

  /**
   * Fetches a paginated batch of location areas from the PokeAPI.
   * Standardizes the initial URL parameters to guarantee seamless cache hits on backward navigation.
   * @param pageURL - Optional explicit override URL for pagination (next/prev)
   * @returns A promise that resolves to the structured shallow location data
   */
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // Explicitly include query parameters on the default fallback URL so it matches the 'previous' property format
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;
    
    const cachedData = this.#cache.get<ShallowLocations>(url);
    if (cachedData !== undefined) {
      console.log("(Cache hit! Loading instantly from memory...)");
      return cachedData;
    }

    console.log("(Cache miss. Fetching from remote PokeAPI server...)");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }
    
    const data = (await response.json()) as ShallowLocations;
    
    this.#cache.add(url, data);
    return data;
  }

  /**
   * Fetches full structural details for a single specific location area.
   * @param locationName - The unique string identifier of the location area
   * @returns A promise that resolves to the detailed location area object
   */
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    
    const cachedData = this.#cache.get<Location>(url);
    if (cachedData !== undefined) {
      console.log(`(Cache hit! Loading details for ${locationName} from memory...)`);
      return cachedData;
    }

    console.log(`(Cache miss. Fetching details for ${locationName} from remote PokeAPI...)`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location details for ${locationName}: ${response.status} ${response.statusText}`);
    }
    
    const data = (await response.json()) as Location;
    
    this.#cache.add(url, data);
    return data;
  }
}