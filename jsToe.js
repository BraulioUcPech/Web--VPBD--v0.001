const cells = document.querySelectorAll("[data-cell]");
const resetBtn = document.querySelector(".reset");
let circleTurn;

startGame();

resetBtn.addEventListener("click", startGame);

function startGame() {
    circleTurn = false;
    cells.forEach((cell) => {
        cell.classList.remove("circle", "cross");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? "circle" : "cross";
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    const board = document.querySelector(".grid");
    board.classList.remove("circle", "cross");
    if (circleTurn) {
        board.classList.add("circle");
    } else {
        board.classList.add("cross");
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        alert("Draw!");
    } else {
        const winner = circleTurn ? "Player 1" : "Player 2";
        alert(`${winner} wins!`);
    }
    startGame();
}

function isDraw() {
    return [...cells].every((cell) => {
        return (
            cell.classList.contains("circle") || cell.classList.contains("cross")
        );
    });
}

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

