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