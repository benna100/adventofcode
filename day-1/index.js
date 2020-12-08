const numbers = numbersString
  .split("\n")
  .map((numberString) => parseInt(numberString));

function partOne() {
  numbers.forEach(function (i) {
    numbers.forEach(function (j) {
      if (i + j === 2020) {
        console.log(i, j, i * j);
      }
    });
  });
}

// partOne()

function partTwo() {
  numbers.forEach(function (i) {
    numbers.forEach(function (j) {
      numbers.forEach(function (k) {
        if (i + j + k === 2020) {
          console.log(i * j * k);
        }
      });
    });
  });
}

partTwo();
