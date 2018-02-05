var showScreen = (function () {
'use strict';

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

return showScreen;

}());

//# sourceMappingURL=showScreen.js.map
