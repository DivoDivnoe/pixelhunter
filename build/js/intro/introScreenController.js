var introScreenController = (function () {
'use strict';

const getElementFromTemplate = (template) => {
  const div = document.createElement(`div`);

  div.innerHTML = template;

  return div.children.length > 1 ? div : div.firstElementChild;
};

class AbstractView {
  get template() {
    throw new Error(`You have to define template`);
  }

  _render() {
    return getElementFromTemplate(this.template.trim());
  }

  _bind() {}

  get element() {
    if (!this._element) {
      this._element = this._render();
      this._bind();
    }

    return this._element;
  }
}

class IntroScreenView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
    `;
  }

  _bind() {
    const asterix = this.element.querySelector(`.intro__asterisk`);

    asterix.addEventListener(`click`, () => this.beginGameHandler());
  }

  beginGameHandler() {}
}

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

class IntroScreenController {
  constructor() {
    this.introScreen = new IntroScreenView();
  }

  init() {
    showScreen(this.introScreen.element);
  }
}

return IntroScreenController;

}());

//# sourceMappingURL=introScreenController.js.map
