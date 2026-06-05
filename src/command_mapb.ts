// command_mapb.ts
// Implements the logic to fetch and display previous location areas from the PokeAPI, supporting pagination for continued exploration

import type { State } from "./state.js";

/**
 * Fetches and displays the previous 20 location areas from the PokeAPI.
 * Prevents unnecessary network calls if the user is already on the initial page.
 * * @param state - The central application state container
 * @returns A promise that resolves when the navigation check and display complete
 */
export async function commandMapb(state: State): Promise<void> {
  if (state.prevLocationsURL === null) {
    console.log("you're on the first page");
    return;
  }

  try {
    const locationData = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    // Keep our state navigation links perfectly synchronized
    state.nextLocationsURL = locationData.next;
    state.prevLocationsURL = locationData.previous;

    for (const result of locationData.results) {
      console.log(result.name);
    }
  } catch (error) {
    console.error("Failed to navigate back through map areas:", error);
  }
}

export default commandMapb;