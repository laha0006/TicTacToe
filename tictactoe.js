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
    if (moves.length === 0) {
        // console.log("getLegalMoves found no moves! State:", state);
    }
    return moves;
}

function evaluate(state, depth) {
    // console.log(state)
    const winState = checkWinState(state);
    if (winState !== -1) {
        const computerMarker = isComputerFirst ? O : X;
        if (winState === computerMarker) {
            return 1000 // computer wins
        } else {
            return -1000 // computer loses
        }
    }
    let circlePoints = 0;
    let crossPoints = 0;
    for (let i = 0; i < state.length; i++) {
        const current = state[i];
        if (current === O) {
            circlePoints += points[i];
        }
        if (current === X) {
            crossPoints += points[i];
        }
    }
    return circlePoints - crossPoints;
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

const bestMoveFromScore = {}


// function minimax(state, isMax, currentDepth, targetDepth) {
//     count++;
//     const legalMoves = getLegalMoves(state);
//     if (currentDepth === targetDepth || checkWinState(state) !== -1 || legalMoves.length === 0) {
//         return {score: evaluate(state, currentDepth), move: null};
//     }
//
//     let best;
//     if (isMax) {
//         best = {score: Number.NEGATIVE_INFINITY, move: null};
//         for (let move of legalMoves) {
//             const temp = state[move];
//             state[move] = isComputerFirst ? O : X;
//             const result = minimax(state, false, currentDepth + 1, targetDepth);
//             state[move] = temp;
//             if (result.score > best.score) {
//                 best = {score: result.score, move};
//             }
//         }
//     } else {
//         best = {score: Number.POSITIVE_INFINITY, move: null};
//         for (let move of legalMoves) {
//             const temp = state[move];
//             state[move] = isComputerFirst ? X : O;
//             const result = minimax(state, true, currentDepth + 1, targetDepth);
//             state[move] = temp;
//             if (result.score < best.score) {
//                 best = {score: result.score, move};
//             }
//         }
//     }
//     return best;
// }



let count = 0;

function minmaxOG(state, isMax, currentDepth, targetDepth, alpha, beta) {
    count++;
    const legalMoves = getLegalMoves(state);
    if (currentDepth === targetDepth || checkWinState(state) !== -1 || legalMoves.length === 0) {
        return {score: evaluate(state), move: null};
    }
    const newDepth = currentDepth + 1;
    let best;
    if (isMax) {
        best = {score: Number.NEGATIVE_INFINITY, move: null};
        for (let move of legalMoves) {
            const temp = state[move];
            state[move] = isComputerFirst ? 0 : 1;
            const result = minmaxOG(state, !isMax, newDepth, targetDepth,alpha, beta);
            state[move] = temp;
            if (result.score > best.score) {
                best = {score: result.score, move};
            }
            if (result.score > beta) {
                console.log("break");
                break;
            }
            alpha = Math.max(alpha, result.score);
        }

    } else {
        best = {score: Number.POSITIVE_INFINITY, move: null};
        for (let move of legalMoves) {
            const temp = state[move];
            state[move] = isComputerFirst ? 1 : 0;
            const result = minmaxOG(state, !isMax, newDepth, targetDepth, alpha, beta);
            state[move] = temp;
            if (result.score < best.score) {
                best = {score: result.score, move};
            }
            if (result.score < alpha) {
                console.log("break");
                break;
            }
            beta = Math.max(beta, result.score);
        }
    }
    return best;
}

function getMove(state) {
    return minmaxOG(state, true, 0, 7,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY);
}

