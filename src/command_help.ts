import type { State } from "./state.js";

/**
 * Iterates through the registered commands stored within the application state
 * to display an up-to-date overview of available actions and descriptions.
 * * @param state - The central application state container
 */
export function commandHelp(state: State): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key in state.commands) {
    const command = state.commands[key];
    console.log(`${command.name}: ${command.description}`);
  }
}