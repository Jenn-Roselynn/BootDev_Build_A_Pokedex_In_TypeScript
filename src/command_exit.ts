import type { State } from "./state.js";

/**
 * Shuts down the Pokedex interactive application cleanly, ensuring the
 * readline interface streams are closed before process termination.
 * * @param state - The central application state container
 */
export function commandExit(state: State): void {
  console.log("Closing the Pokedex... Goodbye!");
  state.rl.close();
  process.exit(0);
}