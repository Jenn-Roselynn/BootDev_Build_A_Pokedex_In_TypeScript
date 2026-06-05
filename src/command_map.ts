// command_map.ts
// Implements the logic to fetch and display location areas from the PokeAPI, supporting pagination for continued exploration
import type { State } from "./state.js";

/**
 * Fetches and displays the next 20 location areas from the PokeAPI,
 * updating the pagination state context for subsequent exploration requests.
 * * @param state - The central application state container
 * @returns A promise that resolves when the network call and display logic finish
 */
export async function commandMap(state: State): Promise<void> {
  try {
    // If nextLocationsURL is null, it will default to the initial endpoint inside fetchLocations
    const locationData = await state.pokeAPI.fetchLocations(state.nextLocationsURL ?? undefined);

    // Save our pagination links back to the global state
    state.nextLocationsURL = locationData.next;
    state.prevLocationsURL = locationData.previous;

    // Print out the names of the locations
    for (const result of locationData.results) {
      console.log(result.name);
    }
  } catch (error) {
    console.error("Failed to explore map areas:", error);
  }
}

export default commandMap;