const mainScreen = document.querySelector(`.central`);

const showScreen = (screen) => {
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(screen);
};

export default showScreen;
