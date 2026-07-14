import { SortStep } from "@/types/algorithm";

/** Insertion Sort, extending a sorted prefix one input value at a time. */
export function* insertionSort(input: number[]): Generator<SortStep> {
  const array = [...input];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = array.length > 0 ? [0] : [];

  for (let i = 1; i < array.length; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= 0) {
      comparisons++;
      yield {
        array: [...array],
        comparingIndices: [j, j + 1],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };

      // The key belongs immediately after the first value no greater than it.
      if (array[j] <= key) break;

      array[j + 1] = array[j];
      swaps++;
      yield {
        array: [...array],
        comparingIndices: [j, j + 1],
        swappedIndices: [j + 1],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      j--;
    }

    // Fill the gap left after shifting larger prefix values to the right.
    array[j + 1] = key;
    sortedIndices.push(i);

    yield {
      array: [...array],
      comparingIndices: [],
      swappedIndices: [j + 1],
      sortedIndices: [...sortedIndices],
      comparisons,
      swaps,
    };
  }

  yield {
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [...sortedIndices].sort((a, b) => a - b),
    comparisons,
    swaps,
  };
}
