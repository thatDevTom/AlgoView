// Slider positions map to stable playback presets rather than arbitrary delays.
const SPEED_PRESETS_MS = [1000, 600, 300, 150, 75, 40];
const SPEED_LABELS = ["0.5x", "1x", "2x", "4x", "8x", "16x"];

type PlaybackControlsProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  isAtStart: boolean;
  isAtEnd: boolean;
  currentStepIndex: number;
  totalSteps: number;
  speedMs: number;
  onSpeedChange: (ms: number) => void;
};

/** Reusable transport controls for a single timeline or synchronized race. */
export function PlaybackControls({
  isPlaying,
  onTogglePlay,
  onStepBack,
  onStepForward,
  onReset,
  isAtStart,
  isAtEnd,
  currentStepIndex,
  totalSteps,
  speedMs,
  onSpeedChange,
}: PlaybackControlsProps) {
  // Find the nearest preset when a parent supplies a value from another runner.
  const speedIndex = SPEED_PRESETS_MS.reduce(
    (closest, ms, i) =>
      Math.abs(ms - speedMs) < Math.abs(SPEED_PRESETS_MS[closest] - speedMs)
        ? i
        : closest,
    0
  );

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          disabled={isAtStart}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={onStepBack}
          disabled={isAtStart}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          disabled={isAtEnd && !isPlaying}
          className="rounded-md bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-100 dark:text-black"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={onStepForward}
          disabled={isAtEnd}
          className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm disabled:opacity-40 dark:border-zinc-700"
        >
          Next
        </button>
      </div>

      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        Step {currentStepIndex + 1} / {totalSteps}
      </span>

      <div className="flex w-full max-w-xs items-center gap-2">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Speed</span>
        <input
          type="range"
          min={0}
          max={SPEED_PRESETS_MS.length - 1}
          step={1}
          value={speedIndex}
          onChange={(e) => onSpeedChange(SPEED_PRESETS_MS[Number(e.target.value)])}
          className="flex-1"
        />
        <span className="w-10 text-right text-xs text-zinc-500 dark:text-zinc-400">
          {SPEED_LABELS[speedIndex]}
        </span>
      </div>
    </div>
  );
}
