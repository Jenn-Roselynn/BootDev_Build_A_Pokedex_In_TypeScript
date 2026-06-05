// command_help.ts
// Provides a user-friendly overview of available commands and their descriptions
import type { State } from "./state.js";

/**
 * Iterates through the registered commands stored within the application state
 * to display an up-to-date overview of available actions and descriptions.
 * * @param state - The central application state container
 * @returns A promise that resolves when the display output completes
 */
export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key in state.commands) {
    const command = state.commands[key];
    console.log(`${command.name}: ${command.description}`);
  }
}

export default commandHelp;