/**
 * Shuts down the Pokedex interactive application cleanly.
 */
export function commandExit(): void {
  console.log("Closing the Pokedex... Goodbye!");
  process.exit(0);
}