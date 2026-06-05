import type { CLICommand } from "./command.js";

/**
 * Iterates through the registered commands to display an up-to-date
 * overview of available actions and descriptions.
 * * @param commands - The central registry mapping command words to their configurations
 */
export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:\n");

  for (const key in commands) {
    const command = commands[key];
    console.log(`${command.name}: ${command.description}`);
  }
}