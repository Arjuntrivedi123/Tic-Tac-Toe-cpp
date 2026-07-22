let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const resultDisplay = document.getElementById("result");
const turnDisplay = document.getElementById("turnDisplay");

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");

    if (board[index] !== "" || gameOver) return; // already filled or game ended

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = getWinner();
    if (winner) {
      resultDisplay.textContent = winner + " wins!";
      gameOver = true;
      turnDisplay.textContent = "Game Over";
      return;
    }

    if (!board.includes("")) {
      resultDisplay.textContent = "It's a draw!";
      gameOver = true;
      turnDisplay.textContent = "Game Over";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnDisplay.textContent = "Player " + currentPlayer + "'s turn";
  });
});

document.getElementById("checkBtn").addEventListener("click", () => {
  const winner = getWinner();
  if (winner) {
    resultDisplay.textContent = winner + " wins!";
  } else if (!board.includes("")) {
    resultDisplay.textContent = "It's a draw!";
  } else {
    resultDisplay.textContent = "No winner yet";
  }
});

document.getElementById("restartBtn").addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  cells.forEach(cell => cell.textContent = "");
  resultDisplay.textContent = "";
  turnDisplay.textContent = "Player X's turn";
});

function getWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}
