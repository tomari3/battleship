import Game from './game';

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

const main = document.getElementById('game');
const welcome = elFactory('div', { class: 'prompt_welcome' }, 'Welcome');
const question = elFactory(
  'div',
  { class: 'prompt_question' },
  'Who do you want to play against?'
);
const prompt = elFactory('div', { class: 'welcome_prompt' }, welcome, question);
const you = elFactory('div', { class: 'options_you' }, 'Yourself');
const friend = elFactory('div', { class: 'options_friend' }, 'friend');
const ai = elFactory('div', { class: 'options_ai' }, 'ai');
const options = elFactory('div', { class: 'welcome_options' }, ai, friend, you);

const welcomeDiv = elFactory(
  'div',
  { class: 'welcome-container' },
  prompt,
  options
);

main.append(welcomeDiv);

const aiButton = document.querySelector('.options_ai');
aiButton.addEventListener('click', () => {
  main.textContent = '';
  Game();
});
const friendButton = document.querySelector('.options_friend');
friendButton.addEventListener('click', () => {
  main.textContent = '';
  Game();
});
const youButton = document.querySelector('.options_you');
youButton.addEventListener('click', () => {
  main.textContent = '';
  Game();
});

// Game();
