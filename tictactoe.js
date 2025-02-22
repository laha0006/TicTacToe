const O = 0;
const X = 1;

const points = [3, 2, 3, 2, 4, 2, 3, 2, 3];
let emptyBoard = [-1, -1, -1, -1, -1, -1, -1, -1, -1] // -1 = empty, 0 = O, 1 = X
let isComputerFirst = true;

function getLegalMoves(state) {
    let moves = []
    for (let i = 0; i < state.length; i++) {
        if (state[i] === -1) {
            moves.push(i);
        }
    }
    return moves;
}

function evaluate(state, depth) {
    const winState = checkWinState(state);
    const computerMarker = isComputerFirst ? O : X;
    const playerMarker = isComputerFirst ? X : O;
    if (winState !== -1) {
        if (winState === computerMarker) {
            return 1000 - depth // computer wins
        } else {
            return -1000 - depth // computer loses
        }
    }
    let computerPoints = 0;
    let playerPoints = 0;
    for (let i = 0; i < state.length; i++) {
        const current = state[i];
        if (current === computerMarker) {
            computerPoints += points[i];
        }
        if (current === playerMarker) {
            playerPoints += points[i];
        }
    }
    return computerPoints - playerPoints;
}


//     Horizontal, Vertical and Diagonal win states
const winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function checkWinState(state) {
    let winStateFound = -1;
    winStates.forEach(winState => {
        let one = state[winState[0]];
        let two = state[winState[1]];
        let three = state[winState[2]];
        if (one === two && two === three && one !== -1) {
            winStateFound = state[winState[0]];
        }
    });
    return winStateFound;
}

function isDraw(state) {
    let isDraw = true;
    for (let i = 0; i < state.length; i++) {
        if(state[i] === -1) {
            return false;
        }
    }
    return isDraw && checkWinState(state) === -1;
}

function minimax(state, isMax, currentDepth, targetDepth) {
    count++;
    const legalMoves = getLegalMoves(state);
    if (currentDepth === targetDepth || checkWinState(state) !== -1 || legalMoves.length === 0) {
        return {score: evaluate(state, currentDepth), move: null};
    }

    let best;
    if (isMax) {
        best = {score: Number.NEGATIVE_INFINITY, move: null};
        for (let move of legalMoves) {
            const temp = state[move];
            state[move] = isComputerFirst ? O : X;
            const result = minimax(state, false, currentDepth + 1, targetDepth);
            state[move] = temp;
            if (result.score > best.score) {
                best = {score: result.score, move};
            }
        }
    } else {
        best = {score: Number.POSITIVE_INFINITY, move: null};
        for (let move of legalMoves) {
            const temp = state[move];
            state[move] = isComputerFirst ? X : O;
            const result = minimax(state, true, currentDepth + 1, targetDepth);
            state[move] = temp;
            if (result.score < best.score) {
                best = {score: result.score, move};
            }
        }
    }
    return best;
}



let AbCount = 0;
let count = 0;

function minMaxAlphaBeta(state, isMax, currentDepth, targetDepth, alpha, beta) {
    AbCount++;
    const legalMoves = getLegalMoves(state);
    if (currentDepth === targetDepth || checkWinState(state) !== -1 || legalMoves.length === 0) {
        return {score: evaluate(state,currentDepth), move: null};
    }
    const newDepth = currentDepth + 1;
    let best;
    if (isMax) {
        best = {score: Number.NEGATIVE_INFINITY, move: null};
        for (let move of legalMoves) {
            const temp = state[move];
            state[move] = isComputerFirst ? 0 : 1;
            const result = minMaxAlphaBeta(state, !isMax, newDepth, targetDepth,alpha, beta);
            state[move] = temp;
            if (result.score > best.score) {
                best = {score: result.score, move};
            }
            alpha = Math.max(alpha, result.score);
            if (result.score > beta) {
                break;
            }
        }

    } else {
        best = {score: Number.POSITIVE_INFINITY, move: null};
        for (let move of legalMoves) {
            const temp = state[move];
            state[move] = isComputerFirst ? 1 : 0;
            const result = minMaxAlphaBeta(state, !isMax, newDepth, targetDepth, alpha, beta);
            state[move] = temp;
            if (result.score < best.score) {
                best = {score: result.score, move};
            }
            beta = Math.min(beta, result.score);
            if (result.score < alpha) {
                break;
            }
        }
    }
    return best;
}

function getMove(state,searchDepth) {
    AbCount = 0;
    count = 0;
    const alphaBetaMove = minMaxAlphaBeta(state, true, 0, searchDepth,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY).move;
    const noAlphaBetatMove = minimax(state,true,0,+searchDepth,Number.NEGATIVE_INFINITY);
    console.log("SEARCH DEPTH:", searchDepth);
    console.log("alpha beta count:", AbCount);
    console.log("without    count:", count);
    console.log("pruned          :", count - AbCount)
    return alphaBetaMove;
}