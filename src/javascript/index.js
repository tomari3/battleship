/* eslint-disable object-curly-newline */
const createShip = (length, ID) => ({
  ID,
  length,
  sunkStatus: false,
  hits: [],
  // sunkStatus: false,
  setHit(cord) {
    this.hits.push(cord);
  },
  isSunk() {
    if (this.hits.length >= this.length) {
      this.sunkStatus = true;
      return true;
    }
    return false;
  },
});

const createGameBoard = (myTurn) => ({
  gameBoard: Array(12)
    .fill(0)
    .map(() => Array(12).fill(undefined)),
  shipStorage: [],
  shipCounter: 1,
  missedShots: [],
  sunkStatus: false,
  turn: 0,
  // 0 = attack player , 1 = attack ai
  resetCounter() {
    this.shipCounter = 1;
  },
  resetShipStorage() {
    this.shipStorage.length = 0;
  },
  nextTurn() {
    this.turn = 1 - this.turn;
  },
  isPlacementValid(ship, column, row) {
    if (
      ship.length + column > this.gameBoard.length - 1 ||
      ship.length + row > this.gameBoard.length - 1
    )
      return false;
    if (this.gameBoard[column][row] !== undefined) return false;
    for (let i = 0; i < ship.length + 1; i += 1) {
      if (
        this.gameBoard[column + i][row] !== undefined ||
        this.gameBoard[column + i][row + 1] !== undefined ||
        this.gameBoard[column + i][row - 1] !== undefined ||
        this.gameBoard[column - 1][row + 1] !== undefined ||
        this.gameBoard[column - 1][row - 1] !== undefined ||
        this.gameBoard[column - 1][row] !== undefined
      )
        return false;
    }

    return true;
  },
  isAttackValid() {
    return this.turn === myTurn;
  },

  placeShip(ship, column, row) {
    if (this.isPlacementValid(ship, column, row) === false) {
      return;
    }
    for (let i = 0; i < ship.length; i += 1) {
      this.gameBoard[column + i][row] = this.shipCounter.toString();
    }
    this.shipStorage.push(ship);
    this.shipCounter += 1;
  },
  receiveAttack(attackCord) {
    const column = attackCord[0];
    const row = attackCord[1];
    const id = Number(this.gameBoard[column][row]);
    const ship = this.shipStorage.find((x) => x.ID === id);

    if (!this.isAttackValid(ship)) {
      return false;
    }
    if (this.gameBoard[column][row] !== undefined) {
      ship.setHit(attackCord);
      ship.isSunk();
      this.isAllSunk();
      return true;
    }
    this.missedShots.push(attackCord);
    return 'next';
  },
  isAllSunk() {
    if (this.shipStorage.every((ship) => ship.sunkStatus === true)) {
      this.sunkStatus = true;
      return true;
    }
    return false;
  },
});

const newPlayer = (id, sign) => ({
  turn: Boolean,
  id,
  board: createGameBoard(sign),
});

export { createShip, createGameBoard, newPlayer };
