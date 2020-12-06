const groups = input.split(`

`);

console.log(groups);

function getNumberOfYesAnswers(group) {
  const characters = group.split("").filter((character) => character !== "\n");
  let uniqueCharacters = [...new Set(characters)];

  return uniqueCharacters.length;
}

// part 1
let sum = 0;
groups.forEach((group) => (sum += getNumberOfYesAnswers(group)));

console.log(sum);

// part 2
function intersection() {
  var result = [];
  var lists;

  if (arguments.length === 1) {
    lists = arguments[0];
  } else {
    lists = arguments;
  }

  for (var i = 0; i < lists.length; i++) {
    var currentList = lists[i];
    for (var y = 0; y < currentList.length; y++) {
      var currentValue = currentList[y];
      if (result.indexOf(currentValue) === -1) {
        var existsInAll = true;
        for (var x = 0; x < lists.length; x++) {
          if (lists[x].indexOf(currentValue) === -1) {
            existsInAll = false;
            break;
          }
        }
        if (existsInAll) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
}

function getnumberOfYesAnswersFromEveryone(group) {
  const personsCharacters = group.split("\n").map((group) => group.split(""));

  return intersection(personsCharacters).length;
}

let sum2 = 0;
groups.forEach((group) => (sum2 += getnumberOfYesAnswersFromEveryone(group)));
console.log(sum2);
