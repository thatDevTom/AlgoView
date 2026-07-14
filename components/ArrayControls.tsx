"use client";

import { useState } from "react";

type ArrayControlsProps = {
  arraySize: number;
  onSizeChange: (size: number) => void;
  onRandomize: (size: number) => void;
  onApplyCustom: (values: number[]) => void;
};

const MIN_SIZE = 5;
const MAX_SIZE = 50;

/** Controls for changing the shared input array in either visualizer view. */
export function ArrayControls({
  arraySize,
  onSizeChange,
  onRandomize,
  onApplyCustom,
}: ArrayControlsProps) {
  const [customText, setCustomText] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleApply() {
    // Accept forgiving comma-separated input but reject incomplete or non-numeric arrays.
    const parts = customText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (parts.length < 2) {
      setError("Enter at least 2 comma-separated numbers.");
      return;
    }

    const values = parts.map(Number);
    if (values.some((n) => !Number.isFinite(n))) {
      setError("All values must be valid numbers.");
      return;
    }

    setError(null);
    onApplyCustom(values);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Size ({arraySize})
        </span>
        <input
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          step={1}
          value={arraySize}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="flex-1"
        />
        <button
          type="button"
          onClick={() => onRandomize(arraySize)}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
        >
          Randomize
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Custom array, e.g. 5, 3, 8, 1, 9"
          className="flex-1 rounded-md border border-zinc-300 px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-black"
        />
        <button
          type="button"
          onClick={handleApply}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
        >
          Apply
        </button>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
