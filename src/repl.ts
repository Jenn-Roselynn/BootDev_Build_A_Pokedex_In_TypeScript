import readline from "readline";
import { getCommands } from "./command_registry.js";

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
 * Sets up a listener on standard input and handles registered registry commands.
 */
export function startREPL(): void {
  const commands = getCommands();
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  // Display the initial prompt to the user
  rl.prompt();

  // Listen for line inputs from the terminal
  rl.on("line", (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];

    // Look up the command in our registry
    if (commandName in commands) {
      try {
        commands[commandName].callback(commands);
      } catch (error) {
        console.error(`An error occurred while executing ${commandName}:`, error);
      }
    } else {
      console.log("Unknown command.");
    }

    // Give the prompt control back to the user for the next command
    rl.prompt();

  
  });
}

startREPL();  // Start the REPL when this module is executed directly