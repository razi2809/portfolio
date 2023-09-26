let whoPlayNow; // Who is playing now?
let popup = document.querySelector("#popup");
let playOver = document.getElementById("playAgainBtn");
let divStartGame = document.getElementById("first");
let xStart = document.getElementById("x");
let oStart = document.getElementById("0");
let whoWon = document.getElementById("whoWon");
let xScore = document.getElementById("xScore");
let oScore = document.getElementById("oScore");
let level = document.getElementById("level");
let bestOf3 = document.getElementById("bestOf3");
let bestOf5 = document.getElementById("bestOf5");
let xWon = 0;
let oWon = 0;
let bestOf3Clicked = false;
let doneToPlay = false;
let bestOf5Clicked = false;
const ifEndGame = () => {
  let whoWonTheGame;
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (!cells || cells.length !== 9) {
    return;
  }
  //*check vertical
  // console.log(cells);
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML
    ) {
      //one of the columns is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //*check horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML
    ) {
      //one of the columns is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //*check diagonal
  // \
  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }
  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }
  //*check if game end and someone won or even
  if (popup) {
    if (whoWonTheGame) {
      popup.className = "popup";
      whoWon.innerText = `${whoWonTheGame} won the game`;
      donePlay();

      if (whoWonTheGame == "x") {
        xWon++;
        // console.log(xWon);
        xScore.innerText = xWon;
      } else if (whoWonTheGame == "o") {
        oWon++;
        // console.log(oWon);
        oScore.innerText = oWon;
      }
    } else {
      for (let cell of cells) {
        if (!cell.innerHTML) {
          return; //stop here and continue the game
        }
      }
      popup.className = "popup";
      whoWon.innerText = "no one won the game";
      donePlay();
    }
  }
  if (bestOf3Clicked) {
    if (xWon >= 3 || oWon >= 3) {
      donePlay();
      playOver.style.display = "none";
      whoWon.innerText = `${whoWonTheGame} won the match`;
    }
  } else if (bestOf5Clicked) {
    if (xWon >= 5 || oWon >= 5) {
      donePlay();
      playOver.style.display = "none";
      whoWon.innerText = `${whoWonTheGame} won the match`;
    }
  }
};
const donePlay = () => {
  doneToPlay = true;
};
const handleClickXO = (myE) => {
  /*
    1) check if empty
    2) set innerHTML
    3) next turn
    4) end game
  */
  if (myE.target.innerHTML != "") {
    //the div has x or o
    return; // stop here
  }
  if (whoPlayNow && !doneToPlay) {
    myE.target.innerHTML = whoPlayNow;
    whoPlayNow == "x" ? (whoPlayNow = "o") : (whoPlayNow = "x");
    ifEndGame();
  }
  //the div is empty and I can put in this div x or o
};

const initPageLoad = () => {
  //set click on every cell
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (cells) {
    for (let myDiv of cells) {
      myDiv.addEventListener("click", handleClickXO);
    }
  }
};

const newGame = () => {
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (cells) {
    for (let cell of cells) {
      cell.innerHTML = "";
    }
    popup.className = "none";
  }
};
window.addEventListener("load", () => {
  initPageLoad();
  newGame();
});
playOver.addEventListener("click", () => {
  whoPlayNow = undefined;
  doneToPlay = false;
  divStartGame.className = "first";
  newGame();
});
bestOf3.addEventListener("click", () => {
  level.className = "none";
  divStartGame.className = "first";
  xStart.addEventListener("click", () => {
    whoPlayNow = "x";
    divStartGame.className = "none";
  });
  oStart.addEventListener("click", () => {
    whoPlayNow = "o";
    divStartGame.className = "none";
  });
  bestOf3Clicked = true;
});
bestOf5.addEventListener("click", () => {
  level.className = "none";
  divStartGame.className = "first";
  xStart.addEventListener("click", () => {
    whoPlayNow = "x";
    divStartGame.className = "none";
  });
  oStart.addEventListener("click", () => {
    whoPlayNow = "o";
    divStartGame.className = "none";
  });
  bestOf5Clicked = true;
});
