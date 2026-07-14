import { AlgorithmMeta } from "@/types/algorithm";
import { getAlgorithmsByCategory } from "@/algorithms/registry";

const CATEGORY_LABELS: Record<AlgorithmMeta["category"], string> = {
  sorting: "Sorting",
  pathfinding: "Pathfinding",
};

type SidebarProps = {
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Navigation generated from the algorithm registry. */
export function Sidebar({ selectedId, onSelect }: SidebarProps) {
  const grouped = getAlgorithmsByCategory();

  return (
    <nav className="flex w-64 flex-col gap-6 border-r border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-black">
      {(Object.keys(grouped) as AlgorithmMeta["category"][]).map(
        (category) => (
          <div key={category} className="flex flex-col gap-1">
            <h2 className="px-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {CATEGORY_LABELS[category]}
            </h2>
            <ul className="flex flex-col gap-0.5">
              {grouped[category].map((algo) => {
                const isSelected = algo.id === selectedId;
                return (
                  <li key={algo.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(algo.id)}
                      aria-current={isSelected}
                      className={`flex w-full flex-col rounded-md px-2 py-1.5 text-left transition-colors ${
                        isSelected
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span className="text-sm font-medium">{algo.name}</span>
                      <span
                        className={`text-xs ${
                          isSelected
                            ? "text-zinc-300 dark:text-zinc-600"
                            : "text-zinc-500 dark:text-zinc-500"
                        }`}
                      >
                        Time {algo.timeComplexity} · Space{" "}
                        {algo.spaceComplexity}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )
      )}
    </nav>
  );
}
