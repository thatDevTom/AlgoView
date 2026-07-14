import { SortStep } from "@/types/algorithm";

/** Heap Sort, first building a max heap then extracting its maximum repeatedly. */
export function* heapSort(input: number[]): Generator<SortStep> {
  const array = [...input];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices: number[] = [];

  function* heapify(size: number, root: number): Generator<SortStep> {
    // Restore the max-heap property for the subtree rooted at root.
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      comparisons++;
      yield {
        array: [...array],
        comparingIndices: [largest, left],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      if (array[left] > array[largest]) largest = left;
    }

    if (right < size) {
      comparisons++;
      yield {
        array: [...array],
        comparingIndices: [largest, right],
        swappedIndices: [],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      if (array[right] > array[largest]) largest = right;
    }

    if (largest !== root) {
      [array[root], array[largest]] = [array[largest], array[root]];
      swaps++;
      yield {
        array: [...array],
        comparingIndices: [root, largest],
        swappedIndices: [root, largest],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      // A swap can violate the property lower in the subtree, so sift down.
      yield* heapify(size, largest);
    }
  }

  if (n > 0) {
    // Leaves are already heaps; build upward from the final parent node.
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      yield* heapify(n, i);
    }

    // Each extraction places the current maximum into its final position.
    for (let end = n - 1; end > 0; end--) {
      [array[0], array[end]] = [array[end], array[0]];
      swaps++;
      sortedIndices.unshift(end);
      yield {
        array: [...array],
        comparingIndices: [0, end],
        swappedIndices: [0, end],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
      };
      yield* heapify(end, 0);
    }

    sortedIndices.unshift(0);
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
