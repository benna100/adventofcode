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

const passports = input
  .split(
    `

`
  )
  .map((passport) => passport.split(/[\n ]+/).map((line) => line.split(":")))
  .map((passport) => {
    const newObject = {};
    passport.forEach((keyValue) => {
      newObject[keyValue[0]] = keyValue[1];
    });

    return newObject;
  });
// console.log(passports);
const mustHaveKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const validPassports = passports.filter((passport) => {
  // console.log(passport);
  passport.byr = parseInt(passport.byr);
  passport.iyr = parseInt(passport.iyr);
  passport.eyr = parseInt(passport.eyr);

  const passportKeys = Object.keys(passport);
  const requiredKeys = passportKeys.filter((key) => key !== "cid");

  const isBirthYearValid =
    passport.byr && passport.byr >= 1920 && passport.byr <= 2002;

  const isIssueYearValid =
    passport.iyr && passport.iyr >= 2010 && passport.iyr <= 2020;

  const isExpirationYear =
    passport.eyr && passport.eyr >= 2020 && passport.eyr <= 2030;

  const getHeightRegex = /\d*/g;
  const height = passport.hgt && parseInt(passport.hgt.match(getHeightRegex));
  const isHeightValid =
    passport.hgt && passport.hgt.includes("in")
      ? height >= 59 && height <= 76
      : height >= 150 && height <= 193;

  const isHairColorValidRegex = /#\w{6}/g;
  const isHairColorValid =
    passport.hcl && Boolean(passport.hcl.match(isHairColorValidRegex));

  const acceptedEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  const isValidEyeColor =
    passport.ecl && acceptedEyeColors.includes(passport.ecl);

  const isNumberRegex = /(\d*)/g;
  const isPidValid =
    passport.pid &&
    passport.pid.length === 9 &&
    passport.pid.match(isNumberRegex);
  if (passport.pid && !isPidValid) console.log(passport.pid);

  const allfieldsValid =
    isBirthYearValid &&
    isIssueYearValid &&
    isExpirationYear &&
    isHeightValid &&
    isHairColorValid &&
    isValidEyeColor &&
    isPidValid;

  return requiredKeys.length === mustHaveKeys.length && allfieldsValid;
});

console.log(validPassports.length);
