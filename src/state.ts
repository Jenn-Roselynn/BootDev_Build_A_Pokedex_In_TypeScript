// state.ts
// Defines the central application state container for the Pokedex REPL, including terminal interface, command registry, API client, pagination metadata, and caught Pokemon records.

import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_registry.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

/**
 * Represents an executable asynchronous CLI command within the Pokedex REPL.
 * Supports variadic argument parameters passed from the raw input line tokens.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

/**
 * Global application state container shared across the REPL execution loop
 * and all registered command callbacks. Tracks terminal streams, pagination metadata,
 * network client references, and the user's permanent caught Pokemon collection.
 */
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  caughtPokemon: Record<string, Pokemon>; // Maps a lowercase Pokemon name to its full data profile
};

/**
 * Initializes the central readline interface, instantiates the network client,
 * and aggregates the command registry into a single unified application State object.
 * @returns An initialized State configuration bundle
 */
export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const state: State = {
    rl,
    commands: {},
    pokeAPI: new PokeAPI(),
    nextLocationsURL: null,
    prevLocationsURL: null,
    caughtPokemon: {}, // Start with an empty collection journal
  };

  state.commands = getCommands();

  return state;
}