@AGENTS.md

# Project: AlgoView

Interactive sorting-algorithm visualiser built with Next.js (App Router), TypeScript, Tailwind, and SVG. It is fully client-side and has no backend.

## Architecture

Each algorithm is a generator that yields a complete `SortStep` after every meaningful comparison or mutation. The shared `useAlgorithmRunner` hook materialises those steps into a timeline, allowing the UI to play, pause, reset, and step in either direction without coupling rendering to an algorithm implementation.

## Current features

- Six sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, and Heap Sort.
- Animated SVG bars with comparison, swap, and sorted-state highlights.
- Playback controls, speed presets, random arrays, and custom array input.
- Race mode that runs two algorithms against identical input.

## Adding an algorithm

1. Add an `AlgorithmGenerator` in `algorithms/sorting/`.
2. Register its metadata in `algorithms/registry.ts`.
3. It will automatically be available in the sidebar and race selector.

## Next scope

Pathfinding visualisations, such as Dijkstra, A*, BFS, and DFS.
