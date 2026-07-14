/** A renderable snapshot emitted by a sorting algorithm. */
export type SortStep = {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
  sortedIndices: number[];
  comparisons: number;
  swaps: number;
};

/**
 * Algorithms work as generators so the UI can pause between comparisons and
 * mutations instead of only receiving the final sorted result.
 */
export type AlgorithmGenerator = (input: number[]) => Generator<SortStep>;

/** Metadata used to present an algorithm and create its runner. */
export type AlgorithmMeta = {
  id: string;
  name: string;
  category: "sorting" | "pathfinding";
  timeComplexity: string;
  spaceComplexity: string;
  generator: AlgorithmGenerator;
};
