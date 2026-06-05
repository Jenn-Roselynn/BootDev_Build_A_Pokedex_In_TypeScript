// command_exit.ts
// Implements the 'exit' command for the Pokedex REPL, allowing users to cleanly terminate the application.

import type { State } from "./state.js";

/**
 * Shuts down the Pokedex interactive application cleanly, ensuring the
 * readline interface streams are closed before process termination.
 * * @param state - The central application state container
 */
export async function commandExit(state: State): Promise<void> {
  console.log("Closing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
}

export default commandExit;