/* eslint-disable no-undef */
import { createShip, createGameBoard } from '../src/javascript/index';

const ship1 = createShip(4);
const board1 = createGameBoard();
board1.placeShip(ship1, 0, 0);
board1.receiveAttack([3, 3]);

test('creates a new object with a specified length', () => {
  expect(createShip(12).length).toBe(12);
});

test('create gameBoard as array by fixed size', () => {
  expect(createGameBoard().gameBoard.length).toBe(10);
});

test('place a ships start and end coord', () => {
  expect(board1.gameBoard).toStrictEqual([
    ['1', '', '', '', '', '', '', '', '', ''],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('check if attack hit a ship', () => {
  expect(board1.receiveAttack([0, 0])).toBe(true);
});

// test('check missedShots is being populated', () => {
//   expect(board1.missedShots).toStrictEqual([[3, 3]]);
// });

board1.receiveAttack([4, 4]);

test('check missedShots is being populated 2 items', () => {
  expect(board1.missedShots).toStrictEqual([
    [3, 3],
    [4, 4],
  ]);
});

test('check ship is assigned an Id', () => {
  expect(ship1.ID).toBe(1);
});

test('store a ship in array', () => {
  expect(board1.shipStorage).toStrictEqual([ship1]);
});

test('check setHit on ship1', () => {
  expect(ship1.hits).toStrictEqual([[0, 0]]);
});

test('check attacking enemy board', () => {
  expect(AI.board.receiveAttack([1, 1])).toBe(false);
});

test('new ship on enemy board', () => {
  expect(AI.board.gameBoard).toStrictEqual([
    ['1', '', '', '', '', '', '', '', '', ''],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['1', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ]);
});

test('attack successes on enemy board', () => {
  expect(AI.board.receiveAttack([0, 0])).toBe(true);
});
