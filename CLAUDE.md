@AGENTS.md

# Project: Interactive Algorithm Visualizer

## Stack
Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel. Fully client-side, no backend. Rendering: SVG (not Canvas) — switch to Canvas later only if graph/pathfinding algorithms need it for performance.

## Core Architecture
Each algorithm is implemented as a generator function that yields a full state snapshot after every meaningful operation (comparison, swap, etc). This decouples algorithm logic from rendering/playback entirely.

### Types (types/algorithm.ts)

```typescript
export type SortStep = {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  sortedIndices: number[];
  comparisons: number;
  swaps: number;
};

export type AlgorithmGenerator = (input: number[]) => Generator<SortStep>;

export type AlgorithmMeta = {
  id: string;
  name: string;
  category: "sorting" | "pathfinding";
  timeComplexity: string;
  spaceComplexity: string;
  generator: AlgorithmGenerator;
};
```

Reference implementation already written: `algorithms/sorting/bubbleSort.ts` (generator yields before AND after each swap decision, tracks running comparisons/swaps).

## Features to build (in order)
1. ✅ Scaffold + deploy empty shell to Vercel
2. ✅ Step-generator types + bubbleSort reference implementation
3. ✅ AlgorithmRunner hook — consumes a generator into a steppable array of states (`[...algorithm(input)]`), exposes current step index, powers play/pause/step-forward/step-back/speed control
4. ✅ Sidebar — typed registry of AlgorithmMeta objects, grouped by category, selectable, shows complexity
5. ✅ SVG bar renderer — array value → bar height, driven by current SortStep, CSS transitions for smooth animation
6. ✅ Playback controls UI — play/pause, step forward/back, speed slider, custom array input, randomize with size slider
7. ✅ Live stats — comparisons/swaps counters + chart of actual ops vs theoretical Big-O
8. ✅ Race mode — two algorithms side by side on identical input, stepping in sync (reuses AlgorithmRunner x2)
9. Polish — README explaining the generator architecture + why (✅ done), demo GIF (pending — needs a real capture pass), then add pathfinding algorithms (Dijkstra/A*/BFS/DFS) as phase 2 (not started, separate scope)

## Design principle
Every algorithm just needs to conform to the SortStep-yielding generator shape. UI components never need to know which algorithm is running — this is what makes adding new algorithms and race mode cheap.
