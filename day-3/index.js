const grid = input.split("\n").map((line) => line.split(""));
console.log(grid);

function calculateNextPosition(currentPosition, pattern) {
  const nextPosition = {
    x: (currentPosition.x + pattern.x) % grid[0].length,
    y: currentPosition.y + pattern.y,
  };

  return nextPosition;
}

function getNumberOfFoundTrees(pattern) {
  let position = {
    x: 0,
    y: 0,
  };

  let numberOfTrees = 0;
  while (position.y < grid.length) {
    if (grid[position.y][position.x] === "#") {
      numberOfTrees++;
    }

    position = calculateNextPosition(position, pattern);
  }

  // 231, 94 ikke right
  return numberOfTrees;
}

// part 1
const numberOfTreesFound = getNumberOfFoundTrees({ x: 3, y: 1 });

const patterns = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];

// part 2
let multiply = 1;
patterns.forEach((pattern) => {
  multiply = multiply * getNumberOfFoundTrees(pattern);
});
