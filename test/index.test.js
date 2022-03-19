import { createShip, createGameBoard, board1 } from '../src/javascript/index';

test('creates a new object with a specified length', () => {
  expect(createShip(12).length).toBe(12);
});

test('create gameBoard as array by specified number', () => {
  expect(createGameBoard().gameBoard.length).toBe(5);
});

test('place a ships start and end coord', () => {
  expect(board1.gameBoard).toStrictEqual([
    ['X', '', '', '', ''],
    ['X', '', '', '', ''],
    ['X', '', '', '', ''],
    ['X', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
});

test('check if attack hit a ship', () => {
  expect(board1.receiveAttack([0, 0])).toBe(true);
});
