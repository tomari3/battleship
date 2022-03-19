/* eslint-disable no-unused-vars */
import { createShip, createGameBoard, newPlayer } from './index';
import css from '../css/style.css';

function Game() {
  const root = document.getElementById('root');
  const player = newPlayer('player', 0);
  const ai = newPlayer('ai', 1);

  function randomShips(board) {
    let tries = 0;
    function getRandomAlign() {
      return Math.floor(Math.random() * 2);
    }
    function getRandomCoord() {
      const min = 1;
      const max = board.board.gameBoard.length - 1;
      return Math.floor(Math.random() * (max - min)) + min;
    }
    function getRandomShip() {
      const counter = board.board.shipCounter;
      if (counter >= 1 && counter <= 4) {
        return createShip(1, board.board.shipCounter);
      }
      if (counter >= 5 && counter <= 7) {
        return createShip(2, board.board.shipCounter);
      }
      if (counter >= 8 && counter <= 9) {
        return createShip(3, board.board.shipCounter);
      }
      if (counter === 10) {
        return createShip(4, board.board.shipCounter);
      }

      return true;
    }
    function setShips() {
      return board.board.placeShip(
        getRandomShip(),
        getRandomCoord(),
        getRandomCoord(),
        getRandomAlign()
      );
    }

    while (board.board.shipCounter <= 10) {
      tries += 1;

      if (tries === 1000) {
        tries = 0;
        board.board.resetBoard();
        setShips();
      } else setShips();
    }
  }

  randomShips(player);
  randomShips(ai);

  const elFactory = (type, attributes, ...children) => {
    const el = document.createElement(type);

    Object.keys(attributes).forEach((key) =>
      el.setAttribute(key, attributes[key])
    );

    children.forEach((child) => {
      if (typeof child === 'string') {
        el.appendChild(document.createTextNode(child));
      } else {
        el.appendChild(child);
      }
    });

    return el;
  };

  function renderBoard(board) {
    const gameDiv = elFactory('div', { class: `game-board ${board.id}` });
    for (let i = 1; i < board.board.gameBoard.length - 1; i += 1) {
      const row = elFactory('div', { class: `column column-${i}` });
      for (let j = 1; j < board.board.gameBoard[i].length - 1; j += 1) {
        const div = elFactory('div', {});
        div.classList.add('row', `row-${j}`);
        if (board.board.gameBoard[i][j] !== undefined) {
          // div.textContent = board.board.gameBoard[i][j];
          div.classList.add('ship', `ship-${board.board.gameBoard[i][j]}`);
        }
        row.append(div);
        gameDiv.append(row);
      }
      root.append(gameDiv);
    }
  }

  renderBoard(player);
  console.table(player.board.gameBoard);
  renderBoard(ai);

  function listenerFunction(board, i, j) {
    if (player.board.isAllSunk() === true || ai.board.isAllSunk()) {
      console.log('game over');
      return;
    }
    if (board.board.receiveAttack([i, j]) === 'next') {
      ai.board.nextTurn();
      player.board.nextTurn();
    }
  }
  function playerBoardListener() {
    const board = player;
    const gameBoard = document.querySelectorAll(`.game-board.${board.id}`);
    const columns = document.querySelectorAll(
      `.game-board.${board.id} .column`
    );
    const rows = document.querySelectorAll(`.game-board.${board.id} .row`);
    for (let i = 0; i < columns.length; i += 1) {
      const column = document.querySelectorAll(
        `.game-board.${board.id} .column-${i + 1}`
      );
      for (let j = 0; j < rows.length / 10; j += 1) {
        const row = document.querySelector(
          `.game-board.${board.id} .column-${i + 1} .row-${j + 1}`
        );
        row.addEventListener('click', (_e) => {
          listenerFunction(board, i + 1, j + 1);
        });
      }
    }
  }
  function aiBoardListener() {
    const board = ai;
    const gameBoard = document.querySelectorAll(`.game-board.${board.id}`);
    const columns = document.querySelectorAll(
      `.game-board.${board.id} .column`
    );
    const rows = document.querySelectorAll(`.game-board.${board.id} .row`);
    for (let i = 0; i < columns.length; i += 1) {
      const column = document.querySelectorAll(
        `.game-board.${board.id} .column-${i + 1}`
      );
      for (let j = 0; j < rows.length / 10; j += 1) {
        const row = document.querySelector(
          `.game-board.${board.id} .column-${i + 1} .row-${j + 1}`
        );
        row.addEventListener('click', (_e) => {
          listenerFunction(board, i + 1, j + 1);
        });
      }
    }
  }
  playerBoardListener();
  aiBoardListener();
}

Game();
