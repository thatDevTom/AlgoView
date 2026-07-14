import { PathfindingGenerator } from "@/types/algorithm";
import {
  adjacentPositions,
  buildPath,
  manhattanDistance,
  positionKey,
  snapshot,
} from "./shared";

/** A* combines travelled distance with a Manhattan-distance estimate to the goal. */
export const aStar: PathfindingGenerator = function* (input) {
  const startKey = positionKey(input.start);
  const goalKey = positionKey(input.goal);
  const queue: { position: typeof input.start; cost: number; score: number }[] = [
    { position: input.start, cost: 0, score: manhattanDistance(input.start, input.goal) },
  ];
  const costs = new Map([[startKey, 0]]);
  const parents = new Map<string, string | null>([[startKey, null]]);
  const visited = new Set<string>();
  const frontier = new Set([startKey]);

  while (queue.length) {
    queue.sort((a, b) => a.score - b.score);
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
      if (nextCost >= (costs.get(nextKey) ?? Infinity)) continue;
      costs.set(nextKey, nextCost);
      parents.set(nextKey, currentKey);
      frontier.add(nextKey);
      queue.push({
        position: next,
        cost: nextCost,
        score: nextCost + manhattanDistance(next, input.goal),
      });
    }
    yield snapshot(current, visited, frontier);
  }
  yield snapshot(null, visited, frontier, "unreachable");
};
