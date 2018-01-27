const main = document.querySelector(`.central`);
const header = main.querySelector(`.header`);
const mainGameScreen = main.querySelector(`#app`);

const showScreen = (screen, headerContent) => {
  header.innerHTML = ``;
  mainGameScreen.innerHTML = ``;
  mainGameScreen.appendChild(screen);

  if (headerContent) {
    header.appendChild(headerContent);
  }
};

export default showScreen;
