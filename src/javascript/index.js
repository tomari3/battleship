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
      console.log('a ship has sunk!');
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
  resetBoard() {
    this.gameBoard = Array(12)
      .fill(0)
      .map(() => Array(12).fill(undefined));
    this.shipCounter = 1;
    this.shipStorage.length = 0;
  },
  nextTurn() {
    this.turn = 1 - this.turn;
  },
  isAllSunk() {
    if (this.shipStorage.every((ship) => ship.sunkStatus === true)) {
      this.sunkStatus = true;

      return true;
    }
    return false;
  },

  checkHorizon(ship, column, row) {
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
        this.gameBoard[column][row - 1] !== undefined ||
        this.gameBoard[column - 1][row + 1] !== undefined ||
        this.gameBoard[column - 1][row - 1] !== undefined ||
        this.gameBoard[column - 1][row] !== undefined
      )
        return false;
    }

    return true;
  },
  checkVertical(ship, column, row) {
    if (
      ship.length + column > this.gameBoard.length - 1 ||
      ship.length + row > this.gameBoard.length - 1
    )
      return false;
    if (this.gameBoard[column][row] !== undefined) return false;
    for (let i = 0; i < ship.length + 1; i += 1) {
      if (
        this.gameBoard[column][row + i] !== undefined ||
        this.gameBoard[column + 1][row + i] !== undefined ||
        this.gameBoard[column - 1][row + i] !== undefined ||
        this.gameBoard[column - 1][row] !== undefined ||
        this.gameBoard[column][row - 1] !== undefined ||
        this.gameBoard[column - 1][row - 1] !== undefined ||
        this.gameBoard[column + 1][row - 1] !== undefined ||
        this.gameBoard[column + 1][row] !== undefined
      )
        return false;
    }

    return true;
  },

  placeHorizon(ship, column, row) {
    if (this.checkHorizon(ship, column, row) === false) {
      return;
    }
    for (let i = 0; i < ship.length; i += 1) {
      this.gameBoard[column + i][row] = this.shipCounter.toString();
    }
    this.shipStorage.push(ship);
    this.shipCounter += 1;
  },
  placeVertical(ship, column, row) {
    if (this.checkVertical(ship, column, row) === false) {
      return;
    }
    for (let i = 0; i < ship.length; i += 1) {
      this.gameBoard[column][row + i] = this.shipCounter.toString();
    }
    this.shipStorage.push(ship);
    this.shipCounter += 1;
  },
  isAttackValid(ship, attackCord) {
    if (this.turn === myTurn) {
      console.log('not your turn');
      return false;
    }
    if (ship === undefined) {
      console.log('no ship there');
      if (
        this.missedShots.find((x) => x.join() === attackCord.join()) !==
        undefined
      ) {
        console.log('block already got hit, try again');
        return false;
      }
      return true;
    }
    const isInHits = ship.hits.find((x) => x.join() === attackCord.join());
    if (isInHits !== undefined) {
      console.log('ship already hit, try again');
      return false;
    }
    return true;
  },
  placeShip(ship, column, row, align) {
    if (align === 0) {
      this.placeHorizon(ship, column, row);
    }
    if (align === 1) {
      this.placeVertical(ship, column, row);
    }
  },

  receiveAttack(attackCord) {
    const column = attackCord[0];
    const row = attackCord[1];
    const id = Number(this.gameBoard[column][row]);
    const ship = this.shipStorage.find((x) => x.ID === id);

    if (!this.isAttackValid(ship, attackCord)) {
      return false;
    }
    if (this.gameBoard[column][row] !== undefined) {
      ship.setHit(attackCord);
      ship.isSunk();
      if (this.isAllSunk()) {
        console.log('everything sunk! you lost');
        return false;
      }
      console.log('hit, you have another turn');
      return true;
    }
    this.missedShots.push(attackCord);
    console.log('next turn');
    return 'next';
  },
});

const newPlayer = (id, sign) => ({
  turn: Boolean,
  id,
  board: createGameBoard(sign),
});

export { createShip, createGameBoard, newPlayer };
