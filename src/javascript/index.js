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
  shipCounter: 1,
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
      this.gameBoard[column + i][row] = this.shipCounter.toString();
    }
    // eslint-disable-next-line no-param-reassign
    ship.ID = this.shipCounter;
    this.shipStorage.push(ship);
    this.shipCounter += 1;
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
