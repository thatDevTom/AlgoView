import { SortStep } from "@/types/algorithm";

/** Top-down Merge Sort that exposes comparisons and writes as separate frames. */
export function* mergeSort(input: number[]): Generator<SortStep> {
  const array = [...input];
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  function* merge(lo: number, mid: number, hi: number): Generator<SortStep> {
    // Copy both halves so writes back into array do not overwrite unread values.
    const left = array.slice(lo, mid);
    const right = array.slice(mid, hi);
    let i = 0;
    let j = 0;
    let k = lo;

    while (i < left.length && j < right.length) {
      comparisons++;
      yield {
        array: [...array],
        comparingIndices: [lo + i, mid + j],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };

      array[k] = left[i] <= right[j] ? left[i++] : right[j++];
      swaps++;
      yield {
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      k++;
    }

    while (i < left.length) {
      array[k] = left[i++];
      swaps++;
      yield {
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      k++;
    }

    while (j < right.length) {
      array[k] = right[j++];
      swaps++;
      yield {
        array: [...array],
        comparingIndices: [],
        swappedIndices: [k],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      k++;
    }
  }

  function* sort(lo: number, hi: number): Generator<SortStep> {
    // Half-open ranges make empty and one-element subarrays the same base case.
    if (hi - lo <= 1) return;
    const mid = Math.floor((lo + hi) / 2);
    yield* sort(lo, mid);
    yield* sort(mid, hi);
    yield* merge(lo, mid, hi);
  }

  yield* sort(0, array.length);

  // All positions are final once the top-level merge has finished.
  for (let idx = 0; idx < array.length; idx++) {
    sortedIndices.push(idx);
  }

  yield {
    array: [...array],
    comparingIndices: [],
    swappedIndices: [],
    sortedIndices: [...sortedIndices],
    comparisons,
    swaps,
  };
}
