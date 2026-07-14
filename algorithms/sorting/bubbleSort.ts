import { SortStep } from "@/types/algorithm";

/** Bubble Sort, yielding before each comparison and after every swap. */
export function* bubbleSort(input: number[]): Generator<SortStep> {
  const array = [...input];
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    let swappedThisPass = false;

    for (let j = 0; j < array.length - 1 - i; j++) {
      comparisons++;
      // Yield first so the UI can highlight the pair being inspected.
      yield {
        array: [...array],
        comparingIndices: [j, j + 1],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps++;
        swappedThisPass = true;

        yield {
          array: [...array],
          comparingIndices: [j, j + 1],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
        };
      }
    }

    sortedIndices.unshift(array.length - 1 - i);

    // A pass without swaps proves the remaining prefix is already sorted.
    if (!swappedThisPass) {
      break;
    }
  }

  for (let k = 0; k < array.length; k++) {
    if (!sortedIndices.includes(k)) {
      sortedIndices.push(k);
    }
  }

  // Emit a clean final frame after clearing transient comparison highlights.
  yield {
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [...sortedIndices].sort((a, b) => a - b),
    comparisons,
    swaps,
  };
}
