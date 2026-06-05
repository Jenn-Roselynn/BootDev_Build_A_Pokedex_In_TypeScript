// command_catch.ts
// Implements the 'catch' command for the Pokedex REPL, calculating capture probabilities based on a Pokemon's base experience.

import type { State } from "./state.js";

/**
 * Attempts to capture a specified Pokemon species by fetching its metrics and rolling a random check.
 * Successful captures store the complete data profile inside the user's permanent caughtPokemon state ledger.
 * @param state - The central application state container
 * @param args - Command line arguments, where args[0] is the lowercase target Pokemon name
 * @returns A promise that resolves when the capture flow and console notifications wrap up
 */
export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  if (args.length !== 1 || args[0].trim() === "") {
    throw new Error("you must provide a pokemon name");
  }

  const pokemonName = args[0].toLowerCase().trim();

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  // Allow network operational exceptions or 404s from typos to bubble straight up to the REPL
  const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);

  // Establish a dynamic threshold scale: higher base experience values lower the capture scaling
  const catchThreshold = 50;
  const catchChance = Math.min(catchThreshold / pokemonData.base_experience, 1);
  const roll = Math.random();

  if (roll > catchChance) {
    console.log(`${pokemonName} escaped!`);
    return;
  }

  // Persist the caught entity directly into our official state registry
  state.caughtPokemon[pokemonName] = pokemonData;
  console.log(`${pokemonName} was caught!`);
}