import { PathfindingGenerator } from "@/types/algorithm";
import { adjacentPositions, buildPath, positionKey, snapshot } from "./shared";

/** Breadth-first search explores in layers and finds the shortest unweighted path. */
export const breadthFirstSearch: PathfindingGenerator = function* (input) {
  const startKey = positionKey(input.start);
  const goalKey = positionKey(input.goal);
  const queue = [input.start];
  const visited = new Set([startKey]);
  const frontier = new Set([startKey]);
  const parents = new Map<string, string | null>([[startKey, null]]);

  while (queue.length) {
    const current = queue.shift()!;
    const currentKey = positionKey(current);
    frontier.delete(currentKey);
    if (currentKey === goalKey) {
      yield snapshot(current, visited, frontier, "found", buildPath(parents, current));
      return;
    }
    for (const next of adjacentPositions(current, input)) {
      const nextKey = positionKey(next);
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      frontier.add(nextKey);
      parents.set(nextKey, currentKey);
      queue.push(next);
    }
    yield snapshot(current, visited, frontier);
  }
  yield snapshot(null, visited, frontier, "unreachable");
};
