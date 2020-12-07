const bagCarryingDetailsString = input.split(`\n`);
// console.log(bagCarryingDetailsString);

function processBagCarryingInformation(bagCarryingDetails) {
  const bagCarryingDetailsObject = {};

  bagCarryingDetails.forEach((bagCarryingDetail) => {
    let [bagColor, bagContainments] = bagCarryingDetail.split(" bags contain ");
    bagContainments = bagContainments.split(",").map((containment) => {
      const containmentNoSpace = containment.trim();
      // this is a massive assumption
      const number = containmentNoSpace[0];
      // should be done with regex
      const color = containmentNoSpace
        .split("bag")[0]
        .slice(2, containmentNoSpace.split("bag")[0].length - 1)
        .trim();

      return {
        number,
        color,
      };
    });

    bagCarryingDetailsObject[bagColor] = bagContainments;

    return bagCarryingDetailsObject;
  });

  return bagCarryingDetailsObject;
}

const bagCarryingDetails = processBagCarryingInformation(
  bagCarryingDetailsString
);
// console.log(bagCarryingDetails);

function canBagContainGoldBag(color) {
  if (!(color in bagCarryingDetails)) return false;

  const bagContainments = bagCarryingDetails[color];
  const canBagContainAGoldbag = bagContainments.find(
    (bagContainment) => bagContainment.color === "shiny gold"
  );

  return canBagContainAGoldbag;
}

let bagColorsThatContainGold = [];
let uniqueColors = [];
function processBag([color, bagContainments]) {
  if (color === "other") {
    return;
  } else {
    if (canBagContainGoldBag(color)) {
      bagColorsThatContainGold.push(color);
    } else {
      bagContainments.forEach((bagContainment) => {
        if (canBagContainGoldBag(bagContainment.color)) {
          console.log("ppp", bagContainment.color);
          bagColorsThatContainGold.push(bagContainment.color);
          return;
        } else {
          if (bagContainment.color !== "other")
            processBag([
              bagContainment.color,
              bagCarryingDetails[bagContainment.color],
            ]);
        }
      });
    }
  }
}

// console.log(Object.entries(bagCarryingDetails)[0]);
// processBag(Object.entries(bagCarryingDetails)[1]);
let counter = 0;
for (let [color, bagContainments] of Object.entries(bagCarryingDetails)) {
  processBag([color, bagContainments]);
  if (bagColorsThatContainGold.length > 0) {
    counter++;
  }
  bagColorsThatContainGold = [];
}

// SHEEEIIITTT this got messy...
console.log(counter);
