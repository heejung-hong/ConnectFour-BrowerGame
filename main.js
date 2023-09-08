// State Variables:
  // turn: 1 and -1 to represent players because the visualization can change, also same value as turn
  // board: 2D array
    // null or 0 to represent empty space, no player
    // 1 or -1 player at the cell
  // winner: 
    // null for no winner
    // 1 or -1 for winner
    // 'T' for tie
  // render function to play game

/*----------- constants -----------*/
const COLORS = {
  '0': 'white',
  '1': 'lavender',
  '-1': 'yellow'
}

/*-------- state variable ---------*/
let board; // array of 7 column arrays to initialize board
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 winner; 'T' = Tie

/*-------- cached elements --------*/
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
// markerEls is a nodeList
// change markerEls to an array to access index
// const markerEls = document.querySelectorAll('#markers > div');
// arrayliteral, instead of Array.from method use the brackets create a new array.  The spread syntax spread the out the interable
const markerEls = [...document.querySelectorAll('#markers > div')];

/*-------- event listeners --------*/
document.getElementById('markers').addEventListener('click', handleDrop)
// don't invoke the function, just provide the function.  Invoking will bring back undefined.
playAgainBtn.addEventListener('click', init);

/*----------- functions -----------*/
init();

// initialize all state, then call render() function to visualize the state in the DOM
function init() {
  // to visualize the board's mapping to the DOM
  // board is accessing state variable above
  board = [
    [0, 0, 0, 0, 0, 0], // col 0
    [0, 0, 0, 0, 0, 0], // col 1
    [0, 0, 0, 0, 0, 0], // col 2
    [0, 0, 0, 0, 0, 0], // col 3
    [0, 0, 0, 0, 0, 0], // col 4
    [0, 0, 0, 0, 0, 0], // col 5
    [0, 0, 0, 0, 0, 0], // col 6   
  ];
  turn = 1;
  winner = null;
  render();
}

// In response to user interaction, update all impacted state, then call render()
function handleDrop(event) {
  const colIdx = markerEls.indexOf(event.target)
  // console.log(event.target);
  // Guards...
  if (colIdx === -1) return;
  // console.log(colIdx);
  // Shortcut to the column array
  const colArr = board[colIdx];
  // Find the index of the first 0 in colArr
  const rowIdx = colArr.indexOf(0);
  // update the board state with the current player value (turn)
  // board[colIdx][rowIdx] = turn;
  colArr[rowIdx] = turn;
  // console.log(colIdx, rowIdx);
  turn *= -1;
  // Check for winner
  winner = getWinner(colIdx, rowIdx);

  render();
}

// Check for winner in board state and return null if no winner, 1/-1 if a player has won, 'T'
function getWinner(colIdx, rowIdx) {
  return checkVerticalWin(colIdx, rowIdx) ||
    checkHorizontalWin(colIdx, rowIdx) ||
    checkDiagonalWinNESW(colIdx, rowIdx) ||
    checkDiagonalWinNWSE(colIdx, rowIdx);
}

function checkVerticalWin(colIdx, rowIdx) {
  return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null;
}

function checkHorizontalWin(colIdx, rowIdx) {
  const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0)
  const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0)
  return (adjCountLeft + adjCountRight) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWinNESW(colIdx, rowIdx) {
  const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1)
  const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1)
  return (adjCountNE + adjCountSW) >= 3 ? board[colIdx][rowIdx] : null;
}

function checkDiagonalWinNWSE(colIdx, rowIdx) {
  const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
  const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)
  return (adjCountNW + adjCountSE) >= 3 ? board[colIdx][rowIdx] : null;
}

function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
  // Shortcut variable to the player value
  const player = board[colIdx][rowIdx];
  // Track count of adjacent cells with the same player value
  let count = 0;
  // console.log(player)
  // Initialize new coordinates
  colIdx += colOffset;
  rowIdx += rowOffset;
  while (
    // Ensure colIdx is within bounds of the board array
    board[colIdx] !== undefined &&
    board[colIdx][rowIdx] !== undefined &&
    board[colIdx][rowIdx] === player
  ) {
    count++;
    colIdx += colOffset;
    rowIdx += rowOffset;
  }
  return count
}

// render() function visualizes all the state in the DOM
function render() {
  renderBoard();
  renderMessage();
  // Hide/Show UI elements (controls on the page)
  renderControls();
}

function renderBoard() {
  // need to iterate trough the board state
  board.forEach((colArr, colIdx) => {
    // Iterate over the cells in the current column (colArr)
    colArr.forEach((cellVal, rowIdx) => {
      // console.log(colIdx, rowIdx, cellVal);
      const cellId = `c${colIdx}r${rowIdx}`;
      const cellEl = document.getElementById(cellId);
      // console.log(cellEl)
      // cellVal is 0 or 1 or -1
      cellEl.style.backgroundColor = COLORS[cellVal];
    })
    // console.log(colIdx, colArr);
  });
}

function renderMessage() {
  if (winner === 'T') {
    messageEl.innerText = "It's a Tie!!!";
  } else if (winner) {
    messageEl.innerHTML = `<span style="color: ${COLORS[winner]}">${COLORS[winner].toUpperCase()}</span> Wins!`
  } else {
    // Game is still in play
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span>'s Turn`
  }
}

function renderControls() {
  // Ternary expression is the goto when you wnat 1 of 2 values returned
  // <conditional exression> ? <truthly expression> : <falsy expression>
  playAgainBtn.style.visibility = winner ? 'visible' : 'hidden'
  // Iterate over the marker elements to hide/show
  // according to the column being full (no 0's) or not
  markerEls.forEach((markerEl, colIdx) => {
    // get to col array through the board
    const hideMarker = !board[colIdx].includes(0) || winner;
    markerEl.style.visibility = hideMarker ? 'hidden' : 'visible'
  })
}

