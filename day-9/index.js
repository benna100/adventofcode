const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

const numbers = input.split("\n").map((number, i) => {
  return {
    number: parseInt(number),
    index: i,
  };
});

const numbersOriginal = input.split("\n").map((number) => parseInt(number));
// console.log(numbers);
const preamble = 25;
// const preamble = 5;
let numberImLookingFor;
console.log(numbers.length);
for (let index = preamble; index < numbers.length; index++) {
  const possibleSumNumbers = [...numbers].slice(index - preamble, index);
  const sumNumber = numbers[index].number;
  // console.log(possibleSumNumbers, sumNumber);
  let isSumNumberSumOfPossibleNumbers = false;
  for (let i = 0; i < possibleSumNumbers.length; i++) {
    if (isSumNumberSumOfPossibleNumbers === false) {
      for (let j = 0; j < possibleSumNumbers.length; j++) {
        const number1 = possibleSumNumbers[i];
        const number2 = possibleSumNumbers[j];
        // console.log(number1, number2);
        if (number1.index !== number2.index) {
          if (number1.number + number2.number === sumNumber) {
            // console.log("yup");
            isSumNumberSumOfPossibleNumbers = true;
          }
        }
      }
    }
  }
  if (!isSumNumberSumOfPossibleNumbers) {
    numberImLookingFor = sumNumber;
    // console.log(numberImLookingFor);
  }
}

const sumArray = (array) => array.reduce((a, b) => a + b, 0);

// part 2
Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};
console.log(numberImLookingFor);
// just trying a random number here
const contingeousSetMaxLength = 1000;
for (
  let numbersOfNumbersToSumIndex = 2;
  numbersOfNumbersToSumIndex < contingeousSetMaxLength;
  numbersOfNumbersToSumIndex++
) {
  for (
    let numbersIndex = 0;
    numbersIndex < numbersOriginal.length;
    numbersIndex++
  ) {
    const element = numbersOriginal[numbersIndex];
    const numbersToSum = [...numbersOriginal].slice(
      numbersIndex,
      numbersIndex + numbersOfNumbersToSumIndex
    );

    const sum = sumArray(numbersToSum);
    if (sum === numberImLookingFor) {
      console.log(numbersToSum.min() + numbersToSum.max());
    }
  }
}
