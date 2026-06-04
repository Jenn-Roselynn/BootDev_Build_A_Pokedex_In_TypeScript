import readline from "readline";

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
 * Sets up a listener on standard input and outputs prompt responses.
 */
export function startREPL(): void {
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

    const firstWord = words[0];
    console.log(`Your command was: ${firstWord}`);

    // Give the prompt control back to the user for the next command
    rl.prompt();
  });
}