// main.ts
// Entry point for the Pokedex application, initializing the state and starting the REPL.
import { initState } from "./state.js";
import { startREPL } from "./repl.js";

function main() {
  const state = initState();
  startREPL(state);
}

main();