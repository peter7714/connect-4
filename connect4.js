/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1;
let board = [];
function makeBoard() {
  for(let y = 0; y < HEIGHT; y++){
    board.push(Array.from({length: WIDTH}));
  }
}

function makeHtmlBoard() {
  const board = document.getElementById('board');
  const top = document.createElement("tr"); 
  // creates table row at the top for selecting where your chip will go
  top.setAttribute("id", "column-top");
  // adds a atribute to select by in css
  top.addEventListener("click", handleClick);
  // adds click Event listener to select which column the chip will go
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);
  
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}
// Creates an X and Y coordinate on the board and when a Y coordinate is selected when the Y coordinate is selected it will place a piece at the lowest possible X then it will assign that piece and (X,Y) coordinate and the script checks when 4 are in a row it will assign a winner to which ever players pieces it is

function findSpotForCol(x) {
  for(let y = HEIGHT - 1; y >= 0; y--){
    if(!board[y][x]){
      return y;
    }
  }
  return null;
}

function placeInTable(y, x) {
  const chip = document.createElement('div');
  chip.classList.add('chip');
  chip.classList.add(`p${currPlayer}`);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(chip);
}

function endGame(msg) {
  alert(msg);
}

function handleClick(evt) {
  const x = +evt.target.id;
  const y = findSpotForCol(x);

  if (y === null) {
    return;
  }
  board[y][x] = currPlayer;
  placeInTable(y, x);

  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  currPlayer = currPlayer === 1 ? 2 : 1;
  // still trying to get use to this syntax over 'if' statements. 
}

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // uses 'grid' to check the state of each chip to see if a play has met the criteria to win.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
