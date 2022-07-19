var GRID = [
    "EMPTY", "EMPTY", "EMPTY",
    "EMPTY", "EMPTY", "EMPTY",
    "EMPTY", "EMPTY", "EMPTY"
]

let currentPlayer = "X";
let gameState = "play"

Array.from(document.querySelectorAll(".cell")).forEach(cell => cell.addEventListener("click", cellClick));
document.querySelector("#restart").addEventListener("click", restartGame);

function nextPlayer() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else if (currentPlayer == "O") {
        currentPlayer = "X";
    }
}

function convertArrayDimension(index) {
    let i = index / 3;
    let j = index % 3;
    return { i, j }; 
}

function checkBoard() {
    const win_conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    
    for (let i = 0; i < win_conditions.length; i++) {
        const condition = win_conditions[i];

        if (GRID[condition[0]] === GRID[condition[1]] && GRID[condition[1]] == GRID[condition[2]] && GRID[condition[2]] == currentPlayer) {
            document.querySelector(".gameover").innerHTML = currentPlayer + " is the winner!";
            gameState = "gameOver";
        }
    }
}

function cellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('index')
    );
    if (gameState != "play") {
        return;
    }
    if (GRID[clickedCellIndex] !== "EMPTY") {
        return;
    } else {
        console.log(currentPlayer);
        GRID[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
        checkBoard(GRID);
        nextPlayer();
    }

}

function restartGame() {
    GRID = [
        "EMPTY", "EMPTY", "EMPTY",
        "EMPTY", "EMPTY", "EMPTY",
        "EMPTY", "EMPTY", "EMPTY"
    ]
    Array.from(document.querySelectorAll(".cell")).forEach(cell => cell.innerHTML = "");
    currentPlayer = "X";
    document.querySelector(".gameover").innerHTML = "";
    gameState = "play";
}