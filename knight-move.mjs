import { addArrays } from "./helper.mjs";

function knightMoves(start, end) {
  const possibleDirections = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  const isValid = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;

  if (!isValid(start) || !isValid(end)) {
    throw new Error("Start or end position is out of bounds.");
  }

  const bfs = (queue) => {
    const found = queue.find(
      (location) => location.tile[0] == end[0] && location.tile[1] == end[1]
    );
    if (found) return found;

    const currentLocation = queue.shift();
    const prevMoves = currentLocation.prev;

    possibleDirections.forEach((direction) => {
      const newLocation = addArrays(currentLocation.tile, direction);
      if (isValid(newLocation)) {
        queue.push({
          tile: newLocation,
          prev: [...prevMoves, currentLocation.tile],
        });
      }
    });

    return bfs(queue);
  };

  const queue = [{ tile: start, prev: [] }];
  const final = bfs(queue);
  const shortestPath = [...final.prev, final.tile];

  return shortestPath;
}

export default knightMoves;
