// command_inspect.ts
// Implements the 'inspect' command for the Pokedex REPL, displaying structural stats and elemental types of caught entries.

import type { State } from "./state.js";

/**
 * Inspects the statistical metadata of a caught Pokemon.
 * Looks up the entity entirely within the local state ledger without invoking network calls.
 * Uncaught lookups trigger standard validation errors that bubble up to the REPL.
 * @param state - The central application state container
 * @param args - Command line arguments, where args[0] is the target Pokemon name
 * @returns A promise that resolves when the display output completes rendering
 */
export async function commandInspect(state: State, ...args: string[]): Promise<void> {
  if (args.length !== 1 || args[0].trim() === "") {
    throw new Error("you must provide a pokemon name");
  }

  const pokemonName = args[0].toLowerCase().trim();

  // Guard against inspecting uncaught entries by letting the error bubble up to the REPL loop
  if (!(pokemonName in state.caughtPokemon)) {
    throw new Error("you have not caught that pokemon");
  }

  const pokemonData = state.caughtPokemon[pokemonName];

  console.log(`Name: ${pokemonData.name}`);
  console.log(`Height: ${pokemonData.height}`);
  console.log(`Weight: ${pokemonData.weight}`);
  
  console.log("Stats:");
  for (const statEntry of pokemonData.stats) {
    console.log(`  -${statEntry.stat.name}: ${statEntry.base_stat}`);
  }

  console.log("Types:");
  for (const typeEntry of pokemonData.types) {
    console.log(`  - ${typeEntry.type.name}`);
  }
}