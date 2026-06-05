# Build a Pokedex in TypeScript 🎮✨

An interactive, command-line Pokedex application built from scratch using TypeScript and Node.js. This project implements a fully functional Read-Eval-Print Loop (REPL), parses structured JSON payloads from the remote PokeAPI service, and features an optimized, generic in-memory cache system with automatic background eviction.

This project is a completed portfolio assignment from the official [Boot.dev Guided Project](https://www.boot.dev/courses/build-pokedex-cli-typescript).

* **Course Authors:** Boot.Dev Team 🧙🐻👩‍💻
* **Implemented By:** Jenn Roselynn 🦇✨🌙

---

## 📋 Course Overview

* **Curriculum Scope:** 24 Hours of interactive content spanning 13 core lessons.
* **Core Concepts Covered:** High-fidelity TypeScript engineering, structural subtyping, generic cache layers, custom automated test design, stream-based interactive CLI infrastructure, and asynchronous query handling.

---

## 🛠️ Key Architectural Features

* **Generic In-Memory Cache:** Implements a decoupled `#cache` engine leveraging native JavaScript `Map` operations, enabling instantaneous in-memory retrieval of historical network requests.
* **Automated Background Reaper Loop:** Features an active interval-based eviction routine (`setInterval`) that sweeps memory and eliminates stale records according to a configurable Time-To-Live (TTL) threshold.
* **Standardized Pagination Keys:** Normalizes URL tracking tokens to handle seamless cache execution across multi-directional map navigation (`map` and `mapb`).
* **Asynchronous REPL Infrastructure:** Uses Node.js `readline` interfaces combined with modern `async/await` control flow to process non-blocking system operations gracefully.

---

## 🕹️ Supported CLI Commands

| Command | Description |
| :--- | :--- |
| `help` | Displays a user-friendly greeting and prints an up-to-date registry overview of all available commands. |
| `map` | Fetches and outputs the names of the next 20 geographic location areas in the Pokemon world. |
| `mapb` | Navigates backward to display the previous 20 location areas. Gracefully blocks network requests if you are currently on the initial page view. |
| `explore <area>` | Explores a specific location area by its unique name, querying and printing all wild Pokémon species available to encounter there. |
| `catch <pokemon>` | Attempts to capture a specified Pokemon species using a dynamic probability scale based on its base experience metric, adding successes to your permanent collection ledger. |
| `inspect <pokemon>` | Displays full statistical profiles and elemental typing configurations entirely from local memory for any previously captured Pokemon species. |
| `exit` | Shuts down active execution loops, destroys open terminal streams, and cleanly terminates the process. |

---

## 🖥️ Example Session

```text
Pokedex > catch bulbasaur
Throwing a Pokeball at bulbasaur...
bulbasaur was caught!

Pokedex > inspect bulbasaur
Name: bulbasaur
Height: 7
Weight: 69
Stats:
  -hp: 45
  -attack: 49
  -defense: 49
  -special-attack: 65
  -special-defense: 65
  -speed: 45
Types:
  - grass
  - poison
```

---

## ⚙️ Development and Execution

### 1. Prerequisites

Ensure you have the compatible version of Node.js installed. This project uses an `.nvmrc` file for version management:

```bash
nvm use
```

### 2. Installation

Install project developer dependencies, testing tools, and system type definitions:

```bash
npm install
```

### 3. Build and Run the Application

Compile the TypeScript source files into native ECMAScript Modules (`dist/`) and boot up the interactive terminal engine:

```bash
npm run dev
```

### 4. Run the Automated Test Suite

Execute the Vitest concurrent tracking assertions to validate the cache's automatic eviction loops and input cleaning routines:

```bash
npm run test
```
