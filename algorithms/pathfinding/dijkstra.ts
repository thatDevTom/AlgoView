import { PathfindingGenerator } from "@/types/algorithm";
import { adjacentPositions, buildPath, positionKey, snapshot } from "./shared";

/** Dijkstra's algorithm expands the lowest-cost reachable cell first. */
export const dijkstra: PathfindingGenerator = function* (input) {
  const startKey = positionKey(input.start);
  const goalKey = positionKey(input.goal);
  const queue: { position: typeof input.start; cost: number }[] = [
    { position: input.start, cost: 0 },
  ];
  const distances = new Map([[startKey, 0]]);
  const parents = new Map<string, string | null>([[startKey, null]]);
  const visited = new Set<string>();
  const frontier = new Set([startKey]);

  while (queue.length) {
    queue.sort((a, b) => a.cost - b.cost);
    const { position: current, cost } = queue.shift()!;
    const currentKey = positionKey(current);
    if (visited.has(currentKey)) continue;
    visited.add(currentKey);
    frontier.delete(currentKey);
    if (currentKey === goalKey) {
      yield snapshot(current, visited, frontier, "found", buildPath(parents, current));
      return;
    }
    for (const next of adjacentPositions(current, input)) {
      const nextKey = positionKey(next);
      const nextCost = cost + 1;
      if (nextCost >= (distances.get(nextKey) ?? Infinity)) continue;
      distances.set(nextKey, nextCost);
      parents.set(nextKey, currentKey);
      frontier.add(nextKey);
      queue.push({ position: next, cost: nextCost });
    }
    yield snapshot(current, visited, frontier);
  }
  yield snapshot(null, visited, frontier, "unreachable");
};
