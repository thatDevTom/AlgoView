import { GridPosition, PathStep, PathStatus, PathfindingInput } from "@/types/algorithm";

export const positionKey = ({ row, col }: GridPosition) => `${row}:${col}`;

export function parsePosition(key: string): GridPosition {
  const [row, col] = key.split(":").map(Number);
  return { row, col };
}

export function adjacentPositions(
  position: GridPosition,
  { rows, cols, walls }: PathfindingInput
): GridPosition[] {
  const wallKeys = new Set(walls.map(positionKey));
  return [
    { row: position.row - 1, col: position.col },
    { row: position.row, col: position.col + 1 },
    { row: position.row + 1, col: position.col },
    { row: position.row, col: position.col - 1 },
  ].filter(
    (next) =>
      next.row >= 0 &&
      next.row < rows &&
      next.col >= 0 &&
      next.col < cols &&
      !wallKeys.has(positionKey(next))
  );
}

export function buildPath(parents: Map<string, string | null>, goal: GridPosition) {
  const path: GridPosition[] = [];
  let current: string | null = positionKey(goal);
  while (current) {
    path.unshift(parsePosition(current));
    current = parents.get(current) ?? null;
  }
  return path;
}

export function snapshot(
  current: GridPosition | null,
  visited: Set<string>,
  frontier: Set<string>,
  status: PathStatus = "searching",
  path: GridPosition[] = []
): PathStep {
  return {
    current,
    visited: [...visited].map(parsePosition),
    frontier: [...frontier].map(parsePosition),
    path,
    status,
  };
}

export const manhattanDistance = (a: GridPosition, b: GridPosition) =>
  Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
