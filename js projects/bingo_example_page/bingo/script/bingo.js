function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // Include the max as an inclusive value
}
let bingo_numbers = [],
  num = [],
  lastNum = [];
for (let i = 1; i <= 25; i++) {
  bingo_numbers.push(i);
}
console.log(bingo_numbers);
let user = document.getElementById("wrapper-user");
let shuffle = document.getElementById("shuffle");
let comp = document.getElementById("wrapper-comp");
const allTheUserInputs = user.querySelectorAll(".userInput");
const allTheComputerInputs = comp.querySelectorAll(".userInput");
let popup = document.querySelector("#popup");
let whoWon = document.getElementById("whoWon");
let suffledNum = document.getElementById("suffledNum");
let playAgainBtn = document.getElementById("playAgainBtn");

const shuffleArr = (array) => {
  let currentIndex = array.length,
    randomIndex,
    tempValue;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
};

const fillTheGame = (inputs) => {
  num = shuffleArr(bingo_numbers);
  console.log(num);
  inputs.forEach((input, index) => {
    input.value = num[index];
  });
};

shuffle.addEventListener("click", () => {
  let bingo_num;
  suffledNum.classList.remove("hidden");
  // Generate a new number until it's not in the lastNum array
  do {
    bingo_num = getRandomInt(1, 25);
  } while (lastNum.includes(bingo_num));
  console.log(bingo_num);
  lastNum.push(bingo_num);
  suffledNum.innerHTML = `<h1>${bingo_num}</h1>`;
  for (input of allTheComputerInputs) {
    if (input.value == bingo_num) {
      input.classList = "bingo";
    }
  }

  for (input of allTheUserInputs) {
    if (input.value == bingo_num) {
      input.classList = "bingo";
    }
  }
  if (popup) {
    if (ifEndGame(allTheUserInputs)) {
      popup.className = "popup";
      whoWon.innerText = `you have won the game!`;
      shuffle.className = "none";
    }
    if (ifEndGame(allTheComputerInputs)) {
      popup.className = "popup";
      whoWon.innerText = `you have lost the game!`;
      shuffle.className = "none";
    }
  }
});
const clearTheGame = (inputs) => {
  inputs.forEach((input) => {
    input.classList.remove("bingo");
  });
};
const ifEndGame = (inputs) => {
  //*check vertical
  // console.log(cells);
  for (let i = 0; i <= 4; i++) {
    if (
      inputs[i].classList.contains(`bingo`) &&
      inputs[i + 5].classList.contains(`bingo`) &&
      inputs[i + 10].classList.contains(`bingo`) &&
      inputs[i + 15].classList.contains(`bingo`) &&
      inputs[i + 20].classList.contains(`bingo`)
    ) {
      return true;
    }
  }
  //*check horizontal
  for (let i = 0; i < 15; i += 3) {
    if (
      inputs[i].classList.contains("bingo") &&
      inputs[i + 1].classList.contains("bingo") &&
      inputs[i + 2].classList.contains("bingo") &&
      inputs[i + 3].classList.contains("bingo") &&
      inputs[i + 4].classList.contains("bingo")
    ) {
      //one of the columns is equal
      return true;
    }
  }
  //*check diagonal
  let i = 0;
  if (
    inputs[i].classList.contains("bingo") &&
    inputs[i + 6].classList.contains("bingo") &&
    inputs[i + 12].classList.contains("bingo") &&
    inputs[i + 18].classList.contains("bingo") &&
    inputs[i + 24].classList.contains("bingo")
  ) {
    return true;
  }
  i = 4;
  if (
    inputs[i].classList.contains("bingo") &&
    inputs[i + 4].classList.contains("bingo") &&
    inputs[i + 8].classList.contains("bingo") &&
    inputs[i + 12].classList.contains("bingo") &&
    inputs[i + 16].classList.contains("bingo")
  )
    return true;
};
playAgainBtn.addEventListener("click", () => {
  fillTheGame(allTheComputerInputs);
  fillTheGame(allTheUserInputs);
  popup.className = "none";
  shuffle.className = "Btn";
  clearTheGame(allTheComputerInputs);
  clearTheGame(allTheUserInputs);
  suffledNum.innerHTML = "";
  lastNum = [];
  suffledNum.classList = "hidden";
});
window.addEventListener("load", () => {
  fillTheGame(allTheComputerInputs);
  fillTheGame(allTheUserInputs);
});
