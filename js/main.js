const RIGHT_KEY = 39;
const LEFT_KEY = 37;

const templates = document.querySelectorAll('template');
const mainScreen = document.querySelector('.central');

const showScreen = num => {
  mainScreen.innerHTML = '';
  mainScreen.appendChild(templates[num].content.cloneNode(true));
};

let number = 0;

document.addEventListener('keydown', evt => {
  if (evt.altKey && evt.keyCode === RIGHT_KEY) {
    number = number === templates.length - 1 ? 0 : number + 1;
  } else if (evt.altKey && evt.keyCode === LEFT_KEY) {
    number = number === 0 ? templates.length - 1 : number - 1;
  }
  showScreen(number);
});

showScreen(number);
