import { AlgorithmMeta, SortStep } from "@/types/algorithm";
import { BarChart } from "@/components/BarChart";

type RaceLaneProps = {
  algorithm: AlgorithmMeta | undefined;
  step: SortStep | undefined;
  currentStepIndex: number;
  totalSteps: number;
  isFinished: boolean;
  isWinner: boolean;
};

/** Displays one independently stepped algorithm in the shared race view. */
export function RaceLane({
  algorithm,
  step,
  currentStepIndex,
  totalSteps,
  isFinished,
  isWinner,
}: RaceLaneProps) {
  // A lane cannot render until its selected algorithm has produced a snapshot.
  if (!algorithm || !step) {
    return <p className="text-zinc-500">Select an algorithm.</p>;
  }

  return (
    <div
      className={`flex flex-1 flex-col items-center gap-3 rounded-md border p-4 ${
        isWinner
          ? "border-green-400 dark:border-green-600"
          : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <div className="text-center">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {algorithm.name} {isWinner && "🏆"}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Time {algorithm.timeComplexity} · Space {algorithm.spaceComplexity}
        </p>
      </div>

      <div className="w-full text-zinc-900 dark:text-zinc-50">
        <BarChart step={step} />
      </div>

      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        Step {currentStepIndex + 1} / {totalSteps} · Comparisons{" "}
        {step.comparisons} · Swaps {step.swaps}
        {isFinished && " · Done"}
      </span>
    </div>
  );
}
