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
const markerEls = document.querySelectorAll('#markers > div');

/*-------- event listeners --------*/



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
    messageEl.innerHTML = `<span style="color: ${COLORS[turn]}">${COLORS[turn].toUpperCase()}</span> Wins!`
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