import { AlgorithmMeta } from "@/types/algorithm";
import { bubbleSort } from "@/algorithms/sorting/bubbleSort";
import { selectionSort } from "@/algorithms/sorting/selectionSort";
import { insertionSort } from "@/algorithms/sorting/insertionSort";
import { mergeSort } from "@/algorithms/sorting/mergeSort";
import { quickSort } from "@/algorithms/sorting/quickSort";
import { heapSort } from "@/algorithms/sorting/heapSort";

// The registry is the single source of truth for algorithm menus and runners.
export const algorithms: AlgorithmMeta[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generator: bubbleSort,
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generator: selectionSort,
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    generator: insertionSort,
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    generator: mergeSort,
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    generator: quickSort,
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    generator: heapSort,
  },
];

export function getAlgorithmsByCategory(): Record<
  AlgorithmMeta["category"],
  AlgorithmMeta[]
> {
  // Build groups from the registry so adding an algorithm automatically
  // updates every navigation surface.
  return algorithms.reduce(
    (groups, algo) => {
      groups[algo.category] = [...(groups[algo.category] ?? []), algo];
      return groups;
    },
    {} as Record<AlgorithmMeta["category"], AlgorithmMeta[]>
  );
}

export function getAlgorithmById(id: string): AlgorithmMeta | undefined {
  // A missing id is allowed while a selector is changing or data is unavailable.
  return algorithms.find((algo) => algo.id === id);
}
