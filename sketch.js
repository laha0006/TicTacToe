let cnv;
let w;
let h;

function setup() {
    cnv = createCanvas(600, 600)
    w = 600 / 3
    h = 600 / 3
    centerCanvas();
    cnv.mouseClicked(canvasClicked)
}

function centerCanvas() {
    let x = (windowWidth - width) / 2; // Center horizontally
    cnv.position(x, 50); // 50 is the y-position; adjust as needed
}

let exampleState = [-1, -1, -1, -1, 0, -1, -1, -1, -1]

function draw() {
    background('#121212');
    drawBoard()
    drawState()
    drawWinState();
}

function drawBoard() {
    stroke('white')
    strokeWeight(2)
    line(0, 0, 0, 600)
    line(200, 0, 200, 600)
    line(400, 0, 400, 600)
    line(600, 0, 600, 600)

    line(0, 0, 600, 0)
    line(0, 200, 600, 200)
    line(0, 400, 600, 400)
    line(0, 600, 600, 600)

}

function drawState() {
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === 0) {
            drawO(i);
        }
        if (gameState[i] === 1) {
            drawX(i)
        }
    }
}

function drawWinState() {
    if (!gameEnded) {
        return
    }
    textAlign(CENTER, CENTER);
    textSize(70)
    if (gameIsDraw) {
        text("DRAW", 300, 300)
        return;
    }
    if (playerWon) {
        text("You Won!", 300, 300)
    } else {
        text("You Lose!", 300, 300)
    }
}

function drawX(location) {
    strokeWeight(3)
    switch (location) {
        case 0: {
            line(50, 50, 150, 150)
            line(50, 150, 150, 50)
            break;
        }
        case 1: {
            line(250, 50, 350, 150)
            line(250, 150, 350, 50)
            break;
        }
        case 2: {
            line(450, 50, 550, 150)
            line(450, 150, 550, 50)
            break;
        }
        case 3: {
            line(50, 250, 150, 350)
            line(50, 350, 150, 250)
            break;
        }
        case 4: {
            line(250, 250, 350, 350)
            line(250, 350, 350, 250)
            break;
        }
        case 5: {
            line(450, 250, 550, 350)
            line(450, 350, 550, 250)
            break;
        }
        case 6: {
            line(50, 450, 150, 550)
            line(50, 550, 150, 450)
            break;
        }
        case 7: {
            line(250, 450, 350, 550)
            line(250, 550, 350, 450)
            break;
        }
        case 8: {
            line(450, 450, 550, 550)
            line(450, 550, 550, 450)
            break;
        }
    }
}

function drawO(location) {
    // strokeWeight(3)
    fill("#121212");
    switch (location) {
        case 0: {
            circle(100, 100, 120);
            break;
        }
        case 1: {
            circle(300, 100, 120);
            break;
        }
        case 2: {
            circle(500, 100, 120);
            break;
        }
        case 3: {
            circle(100, 300, 120);
            break;
        }
        case 4: {
            circle(300, 300, 120);
            break;
        }
        case 5: {
            circle(500, 300, 120);
            break;
        }
        case 6: {
            circle(100, 500, 120);
            break;
        }
        case 7: {
            circle(300, 500, 120);
            break;
        }
        case 8: {
            circle(500, 500, 120);
            break;
        }
    }
}

function canvasClicked() {

    if (mouseX <= 200 && mouseY <= 200) {
        playerMove(0)
    } else if (mouseX <= 400 && mouseY <= 200) {
        playerMove(1)
    } else if (mouseX <= 600 && mouseY <= 200) {
        playerMove(2)
    } else if (mouseX <= 200 && mouseY <= 400) {
        playerMove(3)
    } else if (mouseX <= 400 && mouseY <= 400) {
        playerMove(4)
    } else if (mouseX <= 600 && mouseY <= 400) {
        playerMove(5)
    } else if (mouseX <= 200 && mouseY <= 600) {
        playerMove(6)
    } else if (mouseX <= 400 && mouseY <= 600) {
        playerMove(7)
    } else if (mouseX <= 600 && mouseY <= 600) {
        playerMove(8)
    }
}

let searchDepth;
let gameState = [];
let isPlayerTurn = !isComputerFirst;
let gameEnded = false;
let gameIsDraw = false;
let playerWon = false;

document.addEventListener('DOMContentLoaded', () => {
    const computerFirstElem = document.getElementById("computerFirst")
    const depthElem = document.getElementById("searchDepth")
    const inputSearchDepth = document.getElementById("inputSearchDepth")
    computerFirstElem.innerText = isComputerFirst ? "True" : "False";
    depthElem.innerText = inputSearchDepth.value;
    searchDepth = +inputSearchDepth.value;
});

function toggleComputerStart() {
    isComputerFirst = !isComputerFirst;
    const computerFirstElem = document.getElementById("computerFirst")
    computerFirstElem.innerText = isComputerFirst ? "True" : "False"
}

function setSearchDepth() {
    const inputSearchDepth = document.getElementById("inputSearchDepth")
    const depthElem = document.getElementById("searchDepth")
    searchDepth = +inputSearchDepth.value
    depthElem.innerText = searchDepth;
}


function newGame() {
    gameState = emptyBoard.slice();
    isPlayerTurn = !isComputerFirst;
    gameEnded = false;
    gameIsDraw = false;
    playerWon = false;
    if (isComputerFirst) {
        computerMove()
    }
}

function playerMove(location) {
    if (!isPlayerTurn || !isLegalMove(location)) {
        return;
    }
    gameState[location] = isComputerFirst ? 1 : 0;
    if (hasPlayerWon()) {
        gameEnded = true;
        playerWon = true;
        return;
    }
    if (isDraw(gameState)) {
        gameEnded = true;
        gameIsDraw = true;
        return;
    }
    isPlayerTurn = !isPlayerTurn
    computerMove()
}

function computerMove() {
    let computerMarker = isComputerFirst ? 0 : 1;
    let move = getMove(gameState, searchDepth);
    gameState[move] = computerMarker;
    if (isDraw(gameState)) {
        gameEnded = true;
        gameIsDraw = true;
        return;
    }
    if (hasComputerWon()) {
        gameEnded = true;
        playerWon = false;
        return;
    }
    isPlayerTurn = !isPlayerTurn
}


function isLegalMove(location) {
    return gameState[location] === -1;
}

function hasPlayerWon() {
    let winState = checkWinState(gameState);
    let playerMarker = isComputerFirst ? 1 : 0;
    return winState === playerMarker;
}

function hasComputerWon() {
    let winState = checkWinState(gameState);
    let computerMarker = isComputerFirst ? 0 : 1;
    return winState === computerMarker;
}

