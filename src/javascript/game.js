/* eslint-disable no-unused-vars */
import { createShip, createGameBoard, newPlayer } from './index';
import css from '../css/style.css';
import 'regenerator-runtime/runtime';

export default function Game() {
  const game = document.getElementById('game');
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

  function renderFriendlyBoard(board) {
    const gameDiv = elFactory('div', { class: `game-board ${board.id}` });
    for (let i = 1; i < board.board.gameBoard.length - 1; i += 1) {
      const row = elFactory('div', { class: `column column-${i}` });
      for (let j = 1; j < board.board.gameBoard[i].length - 1; j += 1) {
        const div = elFactory('div', {});
        div.classList.add('row', `row-${j}`);
        if (board.board.gameBoard[i][j] !== undefined) {
          div.classList.add('ship', `ship-${board.board.gameBoard[i][j]}`);
        }
        row.append(div);
        gameDiv.append(row);
      }
      game.append(gameDiv);
    }
  }
  function renderEnemyBoard(board) {
    const gameDiv = elFactory('div', { class: `game-board ${board.id}` });
    for (let i = 1; i < board.board.gameBoard.length - 1; i += 1) {
      const row = elFactory('div', { class: `column column-${i}` });
      for (let j = 1; j < board.board.gameBoard[i].length - 1; j += 1) {
        const div = elFactory('div', {});
        div.classList.add('row', `row-${j}`);
        if (board.board.gameBoard[i][j] !== undefined) {
          div.classList.add('ship', `ship-${board.board.gameBoard[i][j]}`);
        }
        row.append(div);
        gameDiv.append(row);
      }
      game.append(gameDiv);
    }
  }

  renderFriendlyBoard(player);
  renderFriendlyBoard(ai);

  function renderChanges(board) {
    const { missedShots, hits, shipStorage } = board.board;
    missedShots.forEach((array) => {
      const i = array[0];
      const j = array[1];
      const row = document.querySelector(
        `.game-board.${board.id} .column-${i} .row-${j}`
      );
      row.classList.add('missed-shot');
    });
    hits.forEach((array) => {
      const i = array[0];
      const j = array[1];
      const row = document.querySelector(
        `.game-board.${board.id} .column-${i} .row-${j}`
      );
      row.classList.add('hit-shot');
    });
    shipStorage.forEach((ship) => {
      if (ship.sunkStatus === true) {
        const shipParts = document.querySelectorAll(
          `.game-board.${board.id} .ship-${ship.ID}`
        );
        shipParts.forEach((node) => {
          node.classList.remove('hit-shot');
          node.classList.add('ship-sunk');
        });
      }
    });
    const rows = document.querySelectorAll(`.game-board.${board.id} .row`);
    function checkAdd(item) {
      if (item !== undefined && !item.classList.contains('missed-shot')) {
        item.classList.add('unavailable-block');
      }
    }
    for (let i = 0; i < rows.length; i += 1) {
      if (rows[i].classList.contains('ship-sunk')) {
        console.log(i);
        if (i % 10 === 9) {
          console.log('edge');
          checkAdd(rows[i - 1]);
          checkAdd(rows[i + 9]);
          checkAdd(rows[i + 10]);
          checkAdd(rows[i - 10]);
          checkAdd(rows[i - 11]);
        }
        if (i % 10 === 0) {
          console.log('edge');
          checkAdd(rows[i + 1]);
          checkAdd(rows[i + 10]);
          checkAdd(rows[i - 10]);
          checkAdd(rows[i - 9]);
          checkAdd(rows[i + 11]);
        }
        if (i % 10 > 0 && i % 10 < 9) {
          checkAdd(rows[i + 1]);
          checkAdd(rows[i - 1]);
          checkAdd(rows[i + 9]);
          checkAdd(rows[i - 9]);
          checkAdd(rows[i + 10]);
          checkAdd(rows[i - 10]);
          checkAdd(rows[i + 11]);
          checkAdd(rows[i - 11]);
        }
      }
    }
  }

  const aiCoord = {
    myBoard: Array(10)
      .fill(0)
      .map(() => Array(10).fill(undefined)),
    diagonal: 10,
    lastGuess: null,
    getRandomCoord() {
      const min = 1;
      const max = 10;
      return Math.floor(Math.random() * (max - min)) + min;
    },

    takeAGuess() {
      // const { board } = player;
      const i = this.getRandomCoord();
      const j = this.getRandomCoord();
      if (this.myBoard[i - 1][j - 1] === undefined) {
        return [i, j];
      }

      return this.takeAGuess();
    },
  };
  function delay(milliseconds = 500) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
  async function listenerFunction(board, i, j) {
    if (player.board.isAllSunk() === true || ai.board.isAllSunk()) {
      console.log('game over');
      return;
    }
    if (board.board.receiveAttack([i, j]) === 'next') {
      ai.board.nextTurn();
      player.board.nextTurn();
    }
    renderChanges(board);
    if (board.board.turn === 1) {
      await delay();
      const g = aiCoord.takeAGuess();
      listenerFunction(player, g[0], g[1]);
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
    function getRandomCoord() {
      const min = 1;
      const max = board.board.gameBoard.length - 1;
      return Math.floor(Math.random() * (max - min)) + min;
    }
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
