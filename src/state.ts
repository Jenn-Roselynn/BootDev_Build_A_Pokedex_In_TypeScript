import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_registry.js";

/**
 * Represents an executable CLI command within the Pokedex REPL.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

/**
 * Global application state container shared across the REPL execution loop
 * and all registered command callbacks.
 */
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
};

/**
 * Initializes the central readline interface and aggregates the command registry
 * into a single unified application State object.
 * * @returns An initialized State configuration bundle
 */
export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // Temporarily stub out an empty registry object to resolve the chicken-and-egg typing circle.
  // The actual commands registry will fill this dictionary up immediately below.
  const state: State = {
    rl,
    commands: {},
  };

  state.commands = getCommands();

  return state;
}