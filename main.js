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



/*-------- state variable ---------*/
let board; // array of 7 column arrays to initialize board
let turn; // 1 or -1
let winner; // null = no winner; 1 or -1 winner; 'T' = Tie



/*-------- cached elements --------*/



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

function render() {
  
}