import { PathfindingMeta } from "@/types/algorithm";
import { aStar } from "./aStar";
import { breadthFirstSearch } from "./bfs";
import { depthFirstSearch } from "./dfs";
import { dijkstra } from "./dijkstra";

export const pathfindingAlgorithms: PathfindingMeta[] = [
  { id: "dijkstra", name: "Dijkstra", category: "pathfinding", timeComplexity: "O(V²)", spaceComplexity: "O(V)", generator: dijkstra },
  { id: "a-star", name: "A*", category: "pathfinding", timeComplexity: "O(V²)", spaceComplexity: "O(V)", generator: aStar },
  { id: "bfs", name: "Breadth-First Search", category: "pathfinding", timeComplexity: "O(V + E)", spaceComplexity: "O(V)", generator: breadthFirstSearch },
  { id: "dfs", name: "Depth-First Search", category: "pathfinding", timeComplexity: "O(V + E)", spaceComplexity: "O(V)", generator: depthFirstSearch },
];

export const getPathfindingById = (id: string) =>
  pathfindingAlgorithms.find((algorithm) => algorithm.id === id);
