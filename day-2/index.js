function getRegexGroups({ string, regex }) {
  return Array.from(string.matchAll(regex))[0];
}

const passwordLines = input.split("\n");

function part1() {
  const passwordMatches = passwordLines.filter((passwordLine) => {
    const passwordComponentsRegex = /(\d*)-(\d*) (\w): (\w*)/g;
    // iterator cannot destructure
    const passwordComponents = getRegexGroups({
      string: passwordLine,
      regex: passwordComponentsRegex,
    });

    const minimumOccurence = parseInt(passwordComponents[1]);
    const maximumOccurence = parseInt(passwordComponents[2]);
    const letter = passwordComponents[3];
    const password = passwordComponents[4];
    const letterOccurenceInPassword = password.split(letter).length - 1;

    const doesPasswordMatchCriteria =
      letterOccurenceInPassword >= minimumOccurence &&
      letterOccurenceInPassword <= maximumOccurence;

    console.log(
      minimumOccurence,
      maximumOccurence,
      letter,
      password,
      letterOccurenceInPassword,
      doesPasswordMatchCriteria
    );

    return doesPasswordMatchCriteria;
  });

  console.log(passwordMatches.length);
}

// part1();

function part2() {
  const passwordMatches = passwordLines.filter((passwordLine) => {
    console.log(passwordLine);
    const passwordComponentsRegex = /(\d*)-(\d*) (\w): (\w*)/g;
    // iterator cannot destructure
    const passwordComponents = getRegexGroups({
      string: passwordLine,
      regex: passwordComponentsRegex,
    });

    const letter = passwordComponents[3];
    const password = passwordComponents[4];
    const firstCharacter = password[parseInt(passwordComponents[1] - 1)];
    const secondCharacter = password[parseInt(passwordComponents[2] - 1)];
    const letterMatches =
      `${firstCharacter}${secondCharacter}`.split(letter).length - 1;

    const doesPasswordMatchCriteria = letterMatches === 1;

    console.log(
      firstCharacter,
      secondCharacter,
      letter,
      password,
      doesPasswordMatchCriteria
    );

    return doesPasswordMatchCriteria;
  });

  console.log(passwordMatches.length);
}

part2();
