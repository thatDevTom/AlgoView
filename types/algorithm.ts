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

export type GridPosition = {
  row: number;
  col: number;
};

export type PathfindingInput = {
  rows: number;
  cols: number;
  start: GridPosition;
  goal: GridPosition;
  walls: GridPosition[];
};

export type PathStatus = "searching" | "found" | "unreachable";

/** A renderable snapshot emitted while searching a path through the grid. */
export type PathStep = {
  current: GridPosition | null;
  visited: GridPosition[];
  frontier: GridPosition[];
  path: GridPosition[];
  status: PathStatus;
};

export type PathfindingGenerator = (
  input: PathfindingInput
) => Generator<PathStep>;

/** Metadata used to present an algorithm and create its runner. */
export type AlgorithmMeta = {
  id: string;
  name: string;
  category: "sorting" | "pathfinding";
  timeComplexity: string;
  spaceComplexity: string;
  generator: AlgorithmGenerator;
};

export type PathfindingMeta = Omit<AlgorithmMeta, "generator"> & {
  generator: PathfindingGenerator;
};
