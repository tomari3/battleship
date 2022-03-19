import { createShip, createGameBoard, AI, player } from './index';
import css from '../css/style.css';

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

const root = document.getElementById('root');

const playerGBDiv = elFactory('div', { class: 'game-board' });
player.board.gameBoard.forEach((e) => {
  e.forEach((el) => {
    const div = elFactory('div', {}, el);
    playerGBDiv.append(div);
  });
});
root.append(playerGBDiv);
