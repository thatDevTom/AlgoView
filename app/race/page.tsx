"use client";

import { useState } from "react";
import Link from "next/link";
import { AlgorithmSelect } from "@/components/AlgorithmSelect";
import { RaceLane } from "@/components/RaceLane";
import { PlaybackControls } from "@/components/PlaybackControls";
import { ArrayControls } from "@/components/ArrayControls";
import { getAlgorithmById } from "@/algorithms/registry";
import { useAlgorithmRunner } from "@/hooks/useAlgorithmRunner";

const DEFAULT_ARRAY = [5, 3, 8, 1, 9, 2, 7, 4, 6];

/** Produces a fresh shared input so both competitors receive identical data. */
function randomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

export default function RacePage() {
  const [idA, setIdA] = useState("bubble-sort");
  const [idB, setIdB] = useState("selection-sort");
  const [array, setArray] = useState(DEFAULT_ARRAY);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY.length);

  const algoA = getAlgorithmById(idA);
  const algoB = getAlgorithmById(idB);

  // Each lane has its own timeline, but both are driven by the controls below.
  const runnerA = useAlgorithmRunner(algoA?.generator ?? function* () {}, array);
  const runnerB = useAlgorithmRunner(algoB?.generator ?? function* () {}, array);

  const isPlaying = runnerA.isPlaying || runnerB.isPlaying;
  const bothAtStart = runnerA.isAtStart && runnerB.isAtStart;
  const bothAtEnd = runnerA.isAtEnd && runnerB.isAtEnd;

  function togglePlay() {
    if (isPlaying) {
      runnerA.pause();
      runnerB.pause();
    } else {
      runnerA.play();
      runnerB.play();
    }
  }

  function stepForward() {
    runnerA.stepForward();
    runnerB.stepForward();
  }

  function stepBack() {
    runnerA.stepBack();
    runnerB.stepBack();
  }

  function reset() {
    runnerA.reset();
    runnerB.reset();
  }

  function setSpeedMs(ms: number) {
    runnerA.setSpeedMs(ms);
    runnerB.setSpeedMs(ms);
  }

  // The first algorithm to exhaust its generator wins the visual race.
  const winnerId =
    bothAtEnd || (!runnerA.isAtEnd && !runnerB.isAtEnd)
      ? null
      : runnerA.isAtEnd
        ? idA
        : idB;

  return (
    <div className="flex flex-1 flex-col items-center gap-6 bg-zinc-50 p-8 dark:bg-black">
      <div className="flex w-full max-w-4xl items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Race Mode
        </h1>
        <Link
          href="/"
          className="text-sm text-zinc-500 underline dark:text-zinc-400"
        >
          ← Back to single view
        </Link>
      </div>

      <div className="flex w-full max-w-4xl gap-4">
        <AlgorithmSelect label="Algorithm A" value={idA} onChange={setIdA} />
        <AlgorithmSelect label="Algorithm B" value={idB} onChange={setIdB} />
      </div>

      <div className="flex w-full max-w-4xl gap-4">
        <RaceLane
          algorithm={algoA}
          step={runnerA.currentStep}
          currentStepIndex={runnerA.currentStepIndex}
          totalSteps={runnerA.totalSteps}
          isFinished={runnerA.isAtEnd}
          isWinner={winnerId === idA}
        />
        <RaceLane
          algorithm={algoB}
          step={runnerB.currentStep}
          currentStepIndex={runnerB.currentStepIndex}
          totalSteps={runnerB.totalSteps}
          isFinished={runnerB.isAtEnd}
          isWinner={winnerId === idB}
        />
      </div>

      <PlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onStepBack={stepBack}
        onStepForward={stepForward}
        onReset={reset}
        isAtStart={bothAtStart}
        isAtEnd={bothAtEnd}
        currentStepIndex={Math.max(
          runnerA.currentStepIndex,
          runnerB.currentStepIndex
        )}
        totalSteps={Math.max(runnerA.totalSteps, runnerB.totalSteps)}
        speedMs={runnerA.speedMs}
        onSpeedChange={setSpeedMs}
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
    </div>
  );
}
