import type { State } from "./state.js";

/**
 * Splits a string into lowercase words, trimming any leading,
 * trailing, or excess internal whitespace.
 * * @param input - The raw command line input string from the user
 * @returns An array of cleaned, lowercase string tokens
 */
export function cleanInput(input: string): string[] {
  const trimmedLower = input.trim().toLowerCase();
  
  if (trimmedLower === "") {
    return [];
  }
  
  return trimmedLower.split(/\s+/);
}

/**
 * Starts the interactive Read-Eval-Print Loop (REPL) for the Pokedex.
 * Uses the pre-configured application state container to process user lines.
 * * @param state - The initialized application state configuration
 */
export function startREPL(state: State): void {
  // Display the initial prompt to the user using the state's readline interface
  state.rl.prompt();

  // Listen for line inputs from the terminal, using an async wrapper to handle network calls
  state.rl.on("line", async (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];

    // Look up the command in our state's command registry
    if (commandName in state.commands) {
      try {
        // We MUST await our async callbacks so network calls finish before the next prompt displays
        await state.commands[commandName].callback(state);
      } catch (error) {
        console.error(`An error occurred while executing ${commandName}:`, error);
      }
    } else {
      console.log("Unknown command.");
    }

    // Give the prompt control back to the user for the next command
    state.rl.prompt();
  });
}