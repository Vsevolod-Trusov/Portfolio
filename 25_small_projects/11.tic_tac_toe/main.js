const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const EMPTY_STRING = "";
const TURN_PHRASES = {
  X_TURN: "X's turn",
  O_TURN: "O's turn",
};
const board = document.querySelector(".board");
const squares = document.querySelectorAll(".square");
const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart-button");
const players = ["X", "O"];
let currentPlayer = players[0];

function main() {
  message.textContent = TURN_PHRASES.X_TURN;
  restartBtn.addEventListener("click", () => {
    restartGame();
  });

  for (const square of squares) {
    square.addEventListener("click", () => {
      if (square.textContent !== EMPTY_STRING || checkWinner()) {
        console.log("game over");
        return;
      }

      square.textContent = currentPlayer;

      if (checkWinner()) {
        message.textContent = `Game Over! ${currentPlayer}  wins the game ! Please restart`;
        return;
      }

      if (checkTieResult()) {
        message.textContent = `Game Tied! Please restart game)`;
        return;
      }

      currentPlayer = currentPlayer === players[0] ? players[1] : players[0];

      if (currentPlayer === players[0]) {
        message.textContent = TURN_PHRASES.X_TURN;
      } else {
        message.textContent = TURN_PHRASES.O_TURN;
      }
    });
  }
}

function checkTieResult() {
  for (const square of squares) {
    if (square.textContent === EMPTY_STRING) return false;
  }

  return true;
}

function checkWinner() {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern;

    if (
      squares[a].textContent.toLowerCase() === currentPlayer.toLowerCase() &&
      squares[b].textContent.toLowerCase() === currentPlayer.toLowerCase() &&
      squares[c].textContent.toLowerCase() === currentPlayer.toLowerCase()
    ) {
      return true;
    }
  }

  return false;
}

function restartGame() {
  for (const square of squares) {
    square.textContent = EMPTY_STRING;
  }

  message.textContent = TURN_PHRASES.X_TURN;
  currentPlayer = players[0];
}

main();
