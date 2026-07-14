# AlgoView

A personal project for interactively comparing and visualising sorting algorithms. Step through each operation, play at different speeds, or race two algorithms on the same input.

The app runs entirely in the browser and is ready to deploy to Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Race mode is available at `/race`.

## Features

- Six visualised sorting algorithms: Bubble, Selection, Insertion, Merge, Quick, and Heap Sort.
- Animated bar chart with comparison, swap, and sorted-state highlights.
- Step forward/back, reset, play/pause, and adjustable playback speed.
- Random or custom array inputs.
- Race mode with two algorithms running against the identical array.

## Architecture

Each algorithm is a generator that yields a complete visual snapshot after a meaningful operation. The shared runner converts those snapshots into a timeline, so the UI can pause, replay, or step through an algorithm without the algorithm knowing anything about rendering.

```ts
export type SortStep = {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  sortedIndices: number[];
  comparisons: number;
  swaps: number;
};

export type AlgorithmGenerator = (input: number[]) => Generator<SortStep>;
```

This generator interface is shared by every algorithm and is what makes the single view and race mode reusable.

## Adding an algorithm

1. Create a generator in `algorithms/sorting/` that yields `SortStep` values.
2. Register it in `algorithms/registry.ts` with its metadata and complexity.
3. It will automatically appear in the sidebar and race-mode selector.

## Project structure

```text
algorithms/       Algorithm registry and sorting generators
app/              Single-algorithm and race-mode routes
components/       Reusable visualisation and playback UI
hooks/            Generator playback state
types/            Shared algorithm contracts
```

## Roadmap

Pathfinding visualisations, including Dijkstra, A*, BFS, and DFS.
