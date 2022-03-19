const createShip = (length) => ({
  hits: [],
  length,
  sunkStatus: false,
  setHit(cord) {
    this.hits.push(cord);
  },
  isSunk() {
    if (this.hits.length >= this.length) {
      this.sunkStatus = true;
    }
  },
});

const createGameBoard = () => ({
  gameBoard: [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ],
  placeShip(ship, column, row) {
    for (let i = 0; i < ship.length; i += 1) {
      this.gameBoard[column + i][row] = 'X';
    }
  },
  receiveAttack(attackCord) {
    const column = attackCord[0];
    const row = attackCord[1];
    if (this.gameBoard[column][row] === 'X') {
      return true;
    }
    return false;
  },
});

const ship1 = createShip(4);
const board1 = createGameBoard();
board1.placeShip(ship1, 0, 0);

export { createShip, createGameBoard, board1 };
