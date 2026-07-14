"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getPathfindingById, pathfindingAlgorithms } from "@/algorithms/pathfinding/registry";
import { positionKey } from "@/algorithms/pathfinding/shared";
import { AlgorithmSelect } from "@/components/AlgorithmSelect";
import { PathGrid } from "@/components/PathGrid";
import { PlaybackControls } from "@/components/PlaybackControls";
import { useAlgorithmRunner } from "@/hooks/useAlgorithmRunner";
import { GridPosition, PathfindingInput } from "@/types/algorithm";

const ROWS = 13;
const COLS = 21;
const START = { row: 6, col: 2 };
const GOAL = { row: 6, col: 18 };
const DEFAULT_WALLS: GridPosition[] = [
  { row: 2, col: 5 }, { row: 3, col: 5 }, { row: 4, col: 5 }, { row: 5, col: 5 },
  { row: 7, col: 5 }, { row: 8, col: 5 }, { row: 9, col: 5 }, { row: 10, col: 5 },
  { row: 3, col: 11 }, { row: 4, col: 11 }, { row: 5, col: 11 }, { row: 6, col: 11 },
  { row: 7, col: 11 }, { row: 8, col: 11 }, { row: 9, col: 11 },
  { row: 2, col: 15 }, { row: 3, col: 15 }, { row: 4, col: 15 }, { row: 5, col: 15 },
  { row: 7, col: 15 }, { row: 8, col: 15 }, { row: 9, col: 15 }, { row: 10, col: 15 },
];

export default function PathfindingPage() {
  const [selectedId, setSelectedId] = useState("dijkstra");
  const [walls, setWalls] = useState(DEFAULT_WALLS);
  const selected = getPathfindingById(selectedId) ?? pathfindingAlgorithms[0];
  const input = useMemo<PathfindingInput>(
    () => ({ rows: ROWS, cols: COLS, start: START, goal: GOAL, walls }),
    [walls]
  );
  const runner = useAlgorithmRunner(selected.generator, input);
  const step = runner.currentStep;

  function toggleWall(position: GridPosition) {
    const key = positionKey(position);
    setWalls((currentWalls) =>
      currentWalls.some((wall) => positionKey(wall) === key)
        ? currentWalls.filter((wall) => positionKey(wall) !== key)
        : [...currentWalls, position]
    );
  }

  if (!step) return null;

  return (
    <main className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 p-6 dark:bg-black">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Pathfinding</h1>
        <Link href="/" className="text-sm text-zinc-500 underline dark:text-zinc-400">Back to sorting</Link>
      </div>

      <div className="flex w-full max-w-4xl flex-wrap items-end justify-between gap-3">
        <AlgorithmSelect label="Algorithm" value={selected.id} onChange={setSelectedId} options={pathfindingAlgorithms} />
        <div className="text-right text-sm text-zinc-500 dark:text-zinc-400">
          <p>Visited {step.visited.length} cells</p>
          <p>{step.status === "found" ? `Path length ${Math.max(step.path.length - 1, 0)}` : step.status === "unreachable" ? "No route found" : "Searching"}</p>
        </div>
      </div>

      <PathGrid input={input} step={step} onToggleWall={toggleWall} />

      <div className="flex flex-wrap justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500" />Start</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-rose-500" />Goal</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-zinc-700 dark:bg-zinc-300" />Wall</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-sky-400" />Frontier</span>
        <span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-yellow-400" />Path</span>
      </div>

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

      <div className="flex gap-2">
        <button type="button" onClick={() => setWalls([])} className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700">Clear walls</button>
        <button type="button" onClick={() => setWalls(DEFAULT_WALLS)} className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700">Restore maze</button>
      </div>
    </main>
  );
}
