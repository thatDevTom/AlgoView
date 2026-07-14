"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { BarChart } from "@/components/BarChart";
import { PlaybackControls } from "@/components/PlaybackControls";
import { ArrayControls } from "@/components/ArrayControls";
import { getAlgorithmById } from "@/algorithms/registry";
import { useAlgorithmRunner } from "@/hooks/useAlgorithmRunner";

const DEFAULT_ARRAY = [5, 3, 8, 1, 9, 2, 7, 4, 6];

/** Produces display-friendly positive values while preserving the requested size. */
function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

export default function Home() {
  const [selectedId, setSelectedId] = useState("bubble-sort");
  const [array, setArray] = useState(DEFAULT_ARRAY);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY.length);

  const selected = getAlgorithmById(selectedId);

  // The runner owns the immutable timeline used by the bar chart and controls.
  const runner = useAlgorithmRunner(
    selected?.generator ?? function* () {},
    array
  );

  return (
    <div className="flex flex-1 bg-zinc-50 dark:bg-black">
      <Sidebar selectedId={selectedId} onSelect={setSelectedId} />
      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        {selected && runner.currentStep ? (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {selected.name}
              </h1>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Time {selected.timeComplexity} · Space{" "}
                {selected.spaceComplexity}
              </p>
              <Link
                href="/race"
                className="mt-2 inline-block text-sm text-zinc-500 underline dark:text-zinc-400"
              >
                Race Mode →
              </Link>
              <Link
                href="/pathfinding"
                className="mt-2 ml-4 inline-block text-sm text-zinc-500 underline dark:text-zinc-400"
              >
                Pathfinding
              </Link>
            </div>

            <div className="w-full max-w-2xl text-zinc-900 dark:text-zinc-50">
              <BarChart step={runner.currentStep} />
            </div>

            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Comparisons {runner.currentStep.comparisons} · Swaps{" "}
              {runner.currentStep.swaps}
            </span>

            <PlaybackControls
              isPlaying={runner.isPlaying}
              onTogglePlay={runner.togglePlay}
              onStepBack={runner.stepBack}
              onStepForward={runner.stepForward}
              onReset={runner.reset}
              isAtStart={runner.isAtStart}
              isAtEnd={runner.isAtEnd}
              currentStepIndex={runner.currentStepIndex}
              totalSteps={runner.totalSteps}
              speedMs={runner.speedMs}
              onSpeedChange={runner.setSpeedMs}
            />

            <ArrayControls
              arraySize={arraySize}
              onSizeChange={setArraySize}
              onRandomize={(size) => setArray(randomArray(size))}
              onApplyCustom={(values) => {
                setArray(values);
                setArraySize(values.length);
              }}
            />
          </>
        ) : (
          <p className="text-zinc-500">Select an algorithm to begin.</p>
        )}
      </main>
    </div>
  );
}
