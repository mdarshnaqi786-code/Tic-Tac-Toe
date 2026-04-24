let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let wonImg = document.querySelector('#won-img');
let turnDisplay = document.querySelector('#turn');

let oScoreDisplay = document.querySelector('#o-score');
let xScoreDisplay = document.querySelector('#x-score');

let moveCount = 0;
let turno = true; // true = O turn, false = X turn
let oScore = 0;
let xScore = 0;

const winPatterns = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5],
  [6,7,8]
];

const resetGame = () => {
  turno = true;
  moveCount = 0;
  enableBoxes();
  wonImg.src = "images/won.jpg";
  msgContainer.classList.add("hide");
  turnDisplay.innerText = "Current Turn: O";
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(turno){
      box.innerText = "O";
      turno = false;
      turnDisplay.innerText = "Current Turn: X";
    } else {
      box.innerText = "X";
      turno = true;
      turnDisplay.innerText = "Current Turn: O";
    }

    box.disabled = true;
    moveCount++;
    checkWinner();
  });
});

const disableBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = 'Congratulations, Winner is ' + winner;
  wonImg.src = "images/won.jpg";
  msgContainer.classList.remove("hide");
  disableBoxes();

  if(winner === "O"){
    oScore++;
    oScoreDisplay.innerText = oScore;
  } else {
    xScore++;
    xScoreDisplay.innerText = xScore;
  }
};

const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if(pos1Val === pos2Val && pos2Val === pos3Val){
        showWinner(pos1Val);
        return;
      }
    }
  }

  if(moveCount === 9){
    showTie();
  }
};

const showTie = () => {
  msg.innerHTML = "It's a tie!<br>Let's have another match";
  wonImg.src = "images/tie.jpg";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);