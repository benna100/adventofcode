const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const numbers = input
  .split("\n")
  .map((number) => parseInt(number))
  .sort(function (a, b) {
    return a - b;
  });
console.log(numbers);
const oneJoltDifferences = [];
const threeJoltDifferences = [];

let currentJolt = 0;
numbers.forEach((number) => {
  const difference = number - currentJolt;
  if (difference === 1) oneJoltDifferences.push(difference);
  if (difference === 3) threeJoltDifferences.push(difference);
  currentJolt = number;
});

console.log(oneJoltDifferences.length);
console.log(threeJoltDifferences.length + 1);

// part1 answer
// 2692
console.log(oneJoltDifferences.length * (threeJoltDifferences.length + 1));


// part 2. Lets brute it!

