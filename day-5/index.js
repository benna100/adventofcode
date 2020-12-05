const boardingPasses = input.split("\n");

function roundUp(num, precision = 0) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function getRow(rowCharacters) {
  let upperBound = 127;
  let lowerBound = 0;
  rowCharacters.forEach((character) => {
    const diff = Math.abs(upperBound - lowerBound);

    if (character === "F") {
      // only change upper
      upperBound = upperBound - roundUp(diff / 2);
    } else if (character === "B") {
      // only change lower
      lowerBound = lowerBound + roundUp(diff / 2);
    }
  });

  return upperBound;
}

function getColumn(columnCharacters) {
  let upperBound = 7;
  let lowerBound = 0;
  columnCharacters.forEach((character) => {
    const diff = Math.abs(upperBound - lowerBound);

    if (character === "L") {
      // only change upper
      upperBound = upperBound - roundUp(diff / 2);
    } else if (character === "R") {
      // only change lower
      lowerBound = lowerBound + roundUp(diff / 2);
    }
  });

  return upperBound;
}

function getBoardingPassDetails(boardingPass) {
  const row = getRow(boardingPass.slice(0, 7).split(""));
  const column = getColumn(boardingPass.slice(7, 10).split(""));
  if (row === 121) {
    console.log("log");
  }
  return {
    row,
    column,
    seatId: row * 8 + column,
  };
}

// test
const details = getBoardingPassDetails("BBFFBBFRLL");

const highestSeatNumber = Math.max(
  ...boardingPasses.map(
    (boardingPass) => getBoardingPassDetails(boardingPass).seatId
  )
);

// part 1
console.log(highestSeatNumber);

// part 2

const boardingSeats = boardingPasses.map((boardingPass) =>
  getBoardingPassDetails(boardingPass)
);
console.log(boardingSeats);
console.log(boardingSeats.length);

function getMissingSeats(boardingSeats) {
  const missingSeats = [];
  for (let i = 6; i <= 116; i++) {
    for (let j = 0; j <= 7; j++) {
      const isSeatTaken = boardingSeats.find(
        (boardingSeat) => boardingSeat.row === i && boardingSeat.column === j
      );
      // console.log(isSeatTaken, { row: i, column: j, seatId: i * 8 + j });
      if (!isSeatTaken)
        missingSeats.push({ row: i, column: j, seatId: i * 8 + j });
    }
  }
  // check the logs and you will find the answer. Its the seat in the middle
  console.log(missingSeats);
}

getMissingSeats(boardingSeats);
