const fs = require("fs");
const path = require("path");

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

let grid = input.split("\n").map((row) => row.split(""));

const flattenArray = (array) => [].concat.apply([], array);

function isGridsTheSame(array1, array2) {
  return arraysEqual(flattenArray(array1), flattenArray(array2));
}

const rowLength = grid.length;
const columnLength = grid[0].length;
function getNearBySeats(position, grid) {
  const nearbySeats = [];
  for (let index = 0; index < 8; index++) {
    let x = position.x;
    let y = position.y;

    // top left start clockwise around
    if (index === 0) {
      x = position.x - 1;
      y = position.y - 1;
    } else if (index === 1) {
      y = position.y - 1;
    } else if (index === 2) {
      x = position.x + 1;
      y = position.y - 1;
    } else if (index === 3) {
      x = position.x + 1;
    } else if (index === 4) {
      x = position.x + 1;
      y = position.y + 1;
    } else if (index === 5) {
      y = position.y + 1;
    } else if (index === 6) {
      x = position.x - 1;
      y = position.y + 1;
    } else if (index === 7) {
      x = position.x - 1;
    }

    if (x >= 0 && x < rowLength && y >= 0 && y < columnLength) {
      nearbySeats.push({ x, y });
    }
  }

  return nearbySeats.map((position) => getSeatAtPosition(position, grid));
}

function getSeatAtPosition({ x, y }, grid) {
  return grid[x][y];
}

function getNextGrid(nextGrid) {
  return nextGrid.map((row, x) => {
    const updatedRow = row.map((seat, y) => {
      let newSeat = getSeatAtPosition({ x, y }, nextGrid);
      const nearbySeats = getNearBySeats({ x, y }, nextGrid);
      const numberOfEmptySeats = nearbySeats.filter(
        (seat) => seat === "L" || seat === "."
      ).length;

      const numberOfOccupiedSeats = nearbySeats.filter((seat) => seat === "#")
        .length;

      // if (x === 2 && y === 0) {
      //   // console.log(x, y);
      //   // console.log(nearbySeats);
      //   // console.log(numberOfEmptySeats);
      //   console.log("before", newSeat);
      // }

      const isAllNearbySeatsEmpty = numberOfEmptySeats === nearbySeats.length;
      const isSeatEmpty = newSeat === "L";
      const isSeatOccupied = newSeat === "#";
      const isFourOrMoreSeatsOccpied = numberOfOccupiedSeats >= 4;
      const seatIsFloor = newSeat === ".";
      // Now for the business logic
      if (!seatIsFloor && isSeatEmpty && isAllNearbySeatsEmpty) newSeat = "#";
      if (!seatIsFloor && isSeatOccupied && isFourOrMoreSeatsOccpied)
        newSeat = "L";
      // if (x === 2 && y === 0) {
      //   // console.log(x, y);
      //   console.log(nearbySeats);
      //   console.log(!seatIsFloor, isSeatOccupied, isFourOrMoreSeatsOccpied);
      //   console.log(numberOfEmptySeats);
      //   console.log("after", newSeat);
      // }
      return newSeat;
    });
    return updatedRow;
  });
}

let currentGrid = grid.slice();
const grids = [];
let nextGrid = [];

// This was ugly as fuck
while (
  grids.length < 2 ||
  !isGridsTheSame(grids[grids.length - 1], grids[grids.length - 2])
) {
  currentGrid = getNextGrid(currentGrid);

  grids.push(currentGrid);
}

// console.log(grids.length);

// console.log(0);
// console.log(nextGrid);

// const grid1 = getNextGrid(currentGrid);
// // console.log(grid1);
// // console.log(grid1[2]);
// const grid2 = getNextGrid(grid1);
// console.log(grid2);
// const grid2 = getNextGrid(grid1);
// 2585 too high not correct
// 2395 too low
console.log(flattenArray(currentGrid).filter((seat) => seat === "#").length);
