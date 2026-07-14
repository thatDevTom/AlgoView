import { PathfindingInput, PathStep } from "@/types/algorithm";
import { positionKey } from "@/algorithms/pathfinding/shared";

type PathGridProps = {
  input: PathfindingInput;
  step: PathStep;
  onToggleWall: (position: { row: number; col: number }) => void;
};

/** Interactive grid that shows search state and lets visitors place obstacles. */
export function PathGrid({ input, step, onToggleWall }: PathGridProps) {
  const wallKeys = new Set(input.walls.map(positionKey));
  const visitedKeys = new Set(step.visited.map(positionKey));
  const frontierKeys = new Set(step.frontier.map(positionKey));
  const pathKeys = new Set(step.path.map(positionKey));
  const startKey = positionKey(input.start);
  const goalKey = positionKey(input.goal);
  const currentKey = step.current ? positionKey(step.current) : null;

  function cellClass(key: string) {
    if (key === startKey) return "bg-emerald-500";
    if (key === goalKey) return "bg-rose-500";
    if (wallKeys.has(key)) return "bg-zinc-700 dark:bg-zinc-300";
    if (pathKeys.has(key)) return "bg-yellow-400";
    if (key === currentKey) return "bg-violet-500";
    if (frontierKeys.has(key)) return "bg-sky-400";
    if (visitedKeys.has(key)) return "bg-blue-200 dark:bg-blue-950";
    return "bg-white hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900";
  }

  function cellLabel(row: number, col: number, key: string) {
    if (key === startKey) return `Start: row ${row + 1}, column ${col + 1}`;
    if (key === goalKey) return `Goal: row ${row + 1}, column ${col + 1}`;
    return `${wallKeys.has(key) ? "Wall" : "Open cell"}: row ${row + 1}, column ${col + 1}`;
  }

  return (
    <div
      className="grid w-full max-w-4xl overflow-hidden rounded-md border border-zinc-300 dark:border-zinc-700"
      style={{ gridTemplateColumns: `repeat(${input.cols}, minmax(0, 1fr))` }}
      role="grid"
      aria-label="Pathfinding grid. Select an open cell to add or remove a wall."
    >
      {Array.from({ length: input.rows * input.cols }, (_, index) => {
        const position = { row: Math.floor(index / input.cols), col: index % input.cols };
        const key = positionKey(position);
        const isEndpoint = key === startKey || key === goalKey;
        return (
          <button
            key={key}
            type="button"
            role="gridcell"
            aria-label={cellLabel(position.row, position.col, key)}
            disabled={isEndpoint}
            onClick={() => onToggleWall(position)}
            className={`aspect-square border border-zinc-200 transition-colors disabled:cursor-default dark:border-zinc-800 ${cellClass(key)}`}
          />
        );
      })}
    </div>
  );
}
