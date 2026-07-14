import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlgorithmGenerator, SortStep } from "@/types/algorithm";

const DEFAULT_SPEED_MS = 300;

/**
 * Materializes an algorithm's generator into snapshots and exposes playback
 * controls shared by both the single-algorithm and race views.
 */
export function useAlgorithmRunner(
  generator: AlgorithmGenerator,
  input: number[]
) {
  // Materialize once per algorithm/input change so playback only reads snapshots.
  const steps = useMemo(() => [...generator(input)], [generator, input]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(DEFAULT_SPEED_MS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset playback whenever a new generator result replaces the old timeline.
  const [prevSteps, setPrevSteps] = useState(steps);
  if (steps !== prevSteps) {
    setPrevSteps(steps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }

  const isAtStart = currentStepIndex === 0;
  const isAtEnd = currentStepIndex >= steps.length - 1;

  const stepForward = useCallback(() => {
    setCurrentStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [steps.length]);

  const stepBack = useCallback(() => {
    setCurrentStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const play = useCallback(() => {
    if (isAtEnd) return;
    setIsPlaying(true);
  }, [isAtEnd]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => (isAtEnd ? false : !p));
  }, [isAtEnd]);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Only advance one snapshot per tick; cleanup prevents duplicate timers.
    intervalRef.current = setInterval(() => {
      setCurrentStepIndex((i) => {
        if (i >= steps.length - 1) {
          setIsPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, speedMs);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, speedMs, steps.length]);

  const currentStep: SortStep | undefined = steps[currentStepIndex];

  return {
    steps,
    totalSteps: steps.length,
    currentStepIndex,
    currentStep,
    isPlaying,
    isAtStart,
    isAtEnd,
    speedMs,
    setSpeedMs,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBack,
    reset,
  };
}
