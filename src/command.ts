/**
 * Represents a executable CLI command within the Pokedex REPL.
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};