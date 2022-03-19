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
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ],
  missedShots: [],
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
    this.missedShots.push(attackCord);
    return false;
  },
});

export { createShip, createGameBoard };
