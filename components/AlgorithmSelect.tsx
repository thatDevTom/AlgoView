import { algorithms } from "@/algorithms/registry";

type AlgorithmSelectProps = {
  label: string;
  value: string;
  onChange: (id: string) => void;
};

/** Compact algorithm selector used by each race lane. */
export function AlgorithmSelect({ label, value, onChange }: AlgorithmSelectProps) {
  return (
    <label className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-black dark:text-zinc-50"
      >
        {algorithms.map((algo) => (
          <option key={algo.id} value={algo.id}>
            {algo.name}
          </option>
        ))}
      </select>
    </label>
  );
}
