// command_registry.ts
// Constructs and returns the central object mapping string keys to their respective executable CLI command configurations.

import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

/**
 * Constructs and returns the central object mapping string keys
 * to their respective executable CLI command configurations.
 * Includes layout exploration, area analysis, wild captures, journal inspections, and collection overviews.
 * @returns A record container holding all registered commands
 */
export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays the next 20 location areas in the Pokemon world",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas in the Pokemon world",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Displays all wild Pokemon species found within a specified location area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Attempts to capture a specified Pokemon species and add it to your Pokedex",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect",
      description: "Displays stats and elemental typing details for a captured Pokemon species",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Lists all Pokemon you have caught",
      callback: commandPokedex,
    },
  };
}