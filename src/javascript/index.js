const createShip = (length) => ({
  ID: 0,
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
  shipStorage: [],
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
      this.gameBoard[column + i][row] = '1';
    }
    this.shipStorage.push(ship);
  },
  receiveAttack(attackCord) {
    const column = attackCord[0];
    const row = attackCord[1];
    if (this.gameBoard[column][row] !== '') {
      return true;
    }
    this.missedShots.push(attackCord);
    return false;
  },
});

export { createShip, createGameBoard };
