// pokeapi.ts
// Defines types and a class for interacting with the PokeAPI, specifically for fetching location data.
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

  constructor() {}

  /**
   * Fetches a paginated batch of location areas from the PokeAPI.
   * @param pageURL - Optional explicit override URL for pagination (next/prev)
   * @returns A promise that resolves to the structured shallow location data
   */
  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status} ${response.statusText}`);
    }
    
    const data = (await response.json()) as ShallowLocations;
    return data;
  }

  /**
   * Fetches full structural details for a single specific location area.
   * @param locationName - The unique string identifier of the location area
   * @returns A promise that resolves to the detailed location area object
   */
  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location details for ${locationName}: ${response.status} ${response.statusText}`);
    }
    
    const data = (await response.json()) as Location;
    return data;
  }
}


const pokeAPI = new PokeAPI();
export { pokeAPI };