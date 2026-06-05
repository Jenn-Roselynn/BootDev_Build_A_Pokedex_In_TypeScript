// command_pokedex.ts
// Implements the 'pokedex' command for the REPL, listing all unique entries in the user's collection.

import type { State } from "./state.js";

/**
 * Lists the names of all Pokemon currently stored in the user's caughtPokemon state ledger.
 * @param state - The central application state container
 * @returns A promise that resolves when the list has been printed to the console
 */
export async function commandPokedex(state: State): Promise<void> {
  const caughtNames = Object.keys(state.caughtPokemon);

  if (caughtNames.length === 0) {
    console.log("Your Pokedex is empty. Go catch some Pokemon!");
    return;
  }

  console.log("Your Pokedex:");
  for (const name of caughtNames) {
    console.log(` - ${name}`);
  }
}