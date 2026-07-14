import { SortStep } from "@/types/algorithm";

/** Lomuto-partition Quick Sort using the final element of each range as pivot. */
export function* quickSort(input: number[]): Generator<SortStep> {
  const array = [...input];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  function* partition(lo: number, hi: number): Generator<SortStep, number> {
    // Values smaller than the pivot are collected at the start of the range.
    const pivot = array[hi];
    let i = lo - 1;

    for (let j = lo; j < hi; j++) {
      comparisons++;
      yield {
        array: [...array],
        comparingIndices: [j, hi],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };

      if (array[j] < pivot) {
        i++;
        if (i !== j) {
          [array[i], array[j]] = [array[j], array[i]];
          swaps++;
          yield {
            array: [...array],
            comparingIndices: [i, j],
            swappedIndices: [i, j],
            sortedIndices: [...sortedIndices],
            comparisons,
            swaps,
          };
        }
      }
    }

    if (i + 1 !== hi) {
      [array[i + 1], array[hi]] = [array[hi], array[i + 1]];
      swaps++;
      yield {
        array: [...array],
        comparingIndices: [i + 1, hi],
        swappedIndices: [i + 1, hi],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
    }

    // Moving the pivot here fixes its final position before recursive calls.
    sortedIndices.push(i + 1);
    return i + 1;
  }

  function* sort(lo: number, hi: number): Generator<SortStep> {
    if (lo > hi) return;
    if (lo === hi) {
      sortedIndices.push(lo);
      return;
    }
    // yield* forwards every visual step while receiving the pivot index back.
    const p = yield* partition(lo, hi);
    yield* sort(lo, p - 1);
    yield* sort(p + 1, hi);
  }

  if (array.length > 0) {
    yield* sort(0, array.length - 1);
  }

  yield {
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [...new Set(sortedIndices)].sort((a, b) => a - b),
    comparisons,
    swaps,
  };
}
