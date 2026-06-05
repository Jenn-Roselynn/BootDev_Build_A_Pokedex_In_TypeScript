import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_registry.js";
import { PokeAPI } from "./pokeapi.js";

/**
 * Represents an executable asynchronous CLI command within the Pokedex REPL.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

/**
 * Global application state container shared across the REPL execution loop
 * and all registered command callbacks. Tracks terminal streams, pagination metadata,
 * and external API client references.
 */
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

/**
 * Initializes the central readline interface, instantiates the network client,
 * and aggregates the command registry into a single unified application State object.
 * * @returns An initialized State configuration bundle
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
  };

  state.commands = getCommands();

  return state;
}