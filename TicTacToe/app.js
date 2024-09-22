const cells = document.querySelectorAll("[data-cell]");
const resultMessage = document.getElementById("result-message");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const newGameBtn = document.getElementById("new-game-btn");

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = "X";  
let board = Array(9).fill(null);  

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    
    if (board[cellIndex] !== null || checkWin(board)) return;

    
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(board)) {
        displayResult(`${currentPlayer} Wins!`);
    } else if (board.every(cell => cell !== null)) {
        displayResult("It's a Tie!");
    } else {
        
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWin(board) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function displayResult(message) {
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultMessage.textContent = message;
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
    });
    currentPlayer = "X";
    gameScreen.classList.remove("hidden");
    resultScreen.classList.add("hidden");
}


cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

newGameBtn.addEventListener("click", restartGame);
