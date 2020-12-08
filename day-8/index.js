const fs = require("fs");
const path = require("path");

let input = fs.readFileSync(path.resolve(__dirname, "./input.txt"), "utf8");

function getFormattedInput(input) {
  const commandStrings = input.split("\n");
  delete commandStrings[commandStrings.length - 1];
  const commands = commandStrings.map((commandString) => {
    // console.log(commandString);
    const getCommandRegex = /(\w{3}) (-?\+?\d+)/g;
    const [fullmatch, name, value] = Array.from(
      commandString.matchAll(getCommandRegex)
    )[0];
    return {
      name,
      value: parseInt(value),
    };
  });

  return commands;
}

const commands = getFormattedInput(input);

const visitedCommandLines = [];
let acc = 0;
let currentLine = 0;
let terminatedCorrectly = false;
function executeNextCommand(commandNumber, commands) {
  const command = commands[commandNumber];
  if (visitedCommandLines.includes(commandNumber)) {
    terminatedCorrectly = false;
    return;
  }
  if (commandNumber === commands.length - 1) {
    terminatedCorrectly = true;
    return;
  }

  if (command.name === "acc") {
    acc = acc + command.value;
    currentLine++;
  }
  if (command.name === "jmp") currentLine += command.value;
  if (command.name === "nop") currentLine++;
  visitedCommandLines.push(commandNumber);

  executeNextCommand(currentLine, commands);
}

// part 1
// executeNextCommand(currentLine, commands);

// part 2
const numberOfNopsOrJmps = commands.filter(
  (command) => command.name === "nop" || command.name === "jmp"
).length;
for (let index = 0; index < numberOfNopsOrJmps; index++) {
  // console.log("index", index);
  const jmpOrNopCommands = commands
    .map((command, i) => {
      return {
        i,
        name: command.name,
      };
    })
    .filter((command) => command.name === "nop" || command.name === "jmp");

  const currentJmporNopIndex = jmpOrNopCommands[index].i;
  const changedCommands = commands.map((command, i) => {
    let objectToReturn = {
      value: command.value,
      name: command.name,
    };
    if (i === currentJmporNopIndex) {
      if (command.name === "jmp") {
        objectToReturn.name = "nop";
      } else if (command.name === "nop") {
        objectToReturn.name = "jmp";
      }
    }
    return objectToReturn;
  });
  // console.log(changedCommands);

  // console.log("changedCommands", changedCommands);
  // console.log("commands", commands);
  const visitedCommandLines = [];
  let acc = 0;
  let currentLine = 0;
  let terminatedCorrectly = false;
  function executeNextCommand(commandNumber, commands) {
    const command = commands[commandNumber];
    if (visitedCommandLines.includes(commandNumber)) {
      terminatedCorrectly = false;
      return;
    }
    if (commandNumber === commands.length - 1) {
      terminatedCorrectly = true;
      return;
    }

    if (command.name === "acc") {
      acc = acc + command.value;
      currentLine++;
    }
    if (command.name === "jmp") currentLine += command.value;
    if (command.name === "nop") currentLine++;
    visitedCommandLines.push(commandNumber);

    executeNextCommand(currentLine, commands);
  }

  executeNextCommand(currentLine, changedCommands);
  // console.log(acc);
  if (terminatedCorrectly === true) console.log(acc);
  // commands.map((command, i) => {
  //   if (command.name === "jmp") command.name = "nop";
  //   if (command.name === "nop") command.name = "jmp";
  // });
}
