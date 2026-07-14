import { SortStep } from "@/types/algorithm";

/** Selection Sort, placing one minimum value at the front on each pass. */
export function* selectionSort(input: number[]): Generator<SortStep> {
  const array = [...input];
  const sortedIndices: number[] = [];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      comparisons++;
      yield {
        array: [...array],
        comparingIndices: [minIndex, j],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };

      // Remember the best candidate; the actual swap happens after the scan.
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      swaps++;

      yield {
        array: [...array],
        comparingIndices: [i, minIndex],
        swappedIndices: [i, minIndex],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
    }

    // Position i is final once the minimum of the unsorted suffix is placed.
    sortedIndices.push(i);
  }

  if (array.length > 0) {
    sortedIndices.push(array.length - 1);
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
