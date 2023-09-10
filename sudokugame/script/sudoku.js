import { generateUniqueArray } from "./sudoku_log.js";
import { isAllArrayFilled } from "./hard.js";
let hard = document.getElementById("hard");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let easyClicked = false;
let mediumClicked = false;
let hardClicked = false;
let heading = document.getElementById("heading");
let headline = document.getElementById("headline");
let strikecount = document.createElement("h1");
let playOver = document.getElementById("play");
let Message = document.getElementById("message");
let contactMessage = document.getElementById("contactMessage");
const allTheInputs = document.querySelectorAll(".userInput");
Message.className = "none";
headline.appendChild(strikecount);
let result = generateUniqueArray(9);
// console.log(result);
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
const disabledInputs = () => {
  allTheInputs.forEach((input) => {
    input.disabled = true;
  });
};
const enableInputs = () => {
  allTheInputs.forEach((input) => {
    input.disabled = false;
    input.className = "userInput correct";
  });
};
disabledInputs();
// Get all input elements with class "userInput"
let arrayAllInput = [];
for (let i = 0; i < 9; i++) {
  arrayAllInput[i] = new Array(9); // Initialize each row with an array of length 9
}
// Convert NodeList to an array
const inputArray = Array.from(allTheInputs);
// Function to update 2D array when input values change
const updateArrayAllInput = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const inputIndex = i * 9 + j;
      arrayAllInput[j][i] = inputArray[inputIndex].value;
    }
  }
  // console.log("arr", arrayAllInput);
};
const showResults = () => {
  let wrong = 0;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const inputIndex = i * 9 + j;
      if (arrayAllInput[j][i]) {
        if (arrayAllInput[j][i] == result[j][i]) {
          inputArray[inputIndex].className = "userInput correct";
        } else {
          inputArray[inputIndex].className = "userInput wrong";
          wrong++;
        }
      }
    }
  }
  return wrong;
};
const showNums = (howmuch) => {
  for (let i = 0; i < howmuch; i++) {
    let rowRandom = getRandomInt(0, 9);
    let columnRandom = getRandomInt(0, 9);
    if (!inputArray[rowRandom * 9 + columnRandom].value) {
      inputArray[rowRandom * 9 + columnRandom].value =
        result[columnRandom][rowRandom];
      inputArray[rowRandom * 9 + columnRandom].disabled = true;
    } else {
      let rowRandom = getRandomInt(0, 9);
      let columnRandom = getRandomInt(0, 9);
      if (!inputArray[rowRandom * 9 + columnRandom].value) {
        inputArray[rowRandom * 9 + columnRandom].value =
          result[columnRandom][rowRandom];
        inputArray[rowRandom * 9 + columnRandom].disabled = true;
      }
    }
  }
};
const failed = () => {
  allTheInputs.forEach((input) => {
    input.disabled = true;
    Message.className = "popup";
    contactMessage.innerText = "you have failed";
  });
  // console.log("you have failed");
};
const success = () => {
  allTheInputs.forEach((input) => {
    input.disabled = true;
    Message.className = "popup";
    contactMessage.innerText = "congratulations!";
  });
};
const restTheGame = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      inputArray[i * 9 + j].value = "";
    }
  }
};
hard.addEventListener("click", () => {
  enableInputs();
  hardClicked = true;
  mediumClicked = false;
  easyClicked = false;
  hard.className = "none";
  easy.className = "none";
  medium.className = "none";
  heading.innerText = "good luck";
  showNums(getRandomInt(25, 30));
});
medium.addEventListener("click", () => {
  enableInputs();

  easyClicked = false;
  hardClicked = false;
  mediumClicked = true;
  hard.className = "none";
  easy.className = "none";
  medium.className = "none";
  heading.innerText = "you get 3 strikes";

  showNums(30);
});
easy.addEventListener("click", () => {
  enableInputs();

  easyClicked = true;
  hardClicked = false;
  mediumClicked = false;
  hard.className = "none";
  easy.className = "none";
  medium.className = "none";
  heading.innerText = "you get 7 strikes";
  showNums(getRandomInt(33, 38));
});
let wrongCount = 0;
// Attach input event listener to each input element
inputArray.forEach((input) => {
  input.addEventListener("input", () => {
    updateArrayAllInput();
    if (isAllArrayFilled(arrayAllInput, hardClicked)) {
      wrongCount = showResults();
      if (wrongCount >= 1) {
        failed();
        playOver.className = "";
      } else {
        success();
      }
    } else if (easyClicked) {
      wrongCount = showResults();
      if (wrongCount) {
        strikecount.innerText = `you been wrong ${wrongCount} time please be carfull`;
      }
      if (wrongCount == 7) {
        // console.log("enough");
        failed();
      }
    } else if (mediumClicked) {
      wrongCount = showResults();
      if (wrongCount) {
        strikecount.innerText = `you been wrong ${wrongCount} time please be carfull`;
      }
      if (wrongCount == 3) {
        // console.log("enough");
        failed();
      }
    }
  });
});
playOver.addEventListener("click", () => {
  restTheGame();
  disabledInputs();
  heading.innerText = "choose your level";
  strikecount.innerText = "";
  result = generateUniqueArray(9);
  wrongCount = 0;
  // console.log(result);
  hard.className = "btn";
  easy.className = "btn";
  medium.className = "btn";
  Message.className = "none";
  easyClicked = false;
  hardClicked = false;
  mediumClicked = false;
});
