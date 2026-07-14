import { PathfindingGenerator } from "@/types/algorithm";
import { adjacentPositions, buildPath, positionKey, snapshot } from "./shared";

/** Depth-first search follows one branch as far as possible before backtracking. */
export const depthFirstSearch: PathfindingGenerator = function* (input) {
  const startKey = positionKey(input.start);
  const goalKey = positionKey(input.goal);
  const stack = [input.start];
  const visited = new Set([startKey]);
  const frontier = new Set([startKey]);
  const parents = new Map<string, string | null>([[startKey, null]]);

  while (stack.length) {
    const current = stack.pop()!;
    const currentKey = positionKey(current);
    frontier.delete(currentKey);
    if (currentKey === goalKey) {
      yield snapshot(current, visited, frontier, "found", buildPath(parents, current));
      return;
    }
    for (const next of adjacentPositions(current, input).reverse()) {
      const nextKey = positionKey(next);
      if (visited.has(nextKey)) continue;
      visited.add(nextKey);
      frontier.add(nextKey);
      parents.set(nextKey, currentKey);
      stack.push(next);
    }
    yield snapshot(current, visited, frontier);
  }
  yield snapshot(null, visited, frontier, "unreachable");
};
