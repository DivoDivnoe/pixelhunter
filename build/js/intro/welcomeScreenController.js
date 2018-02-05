var welcomeScreenController = (function () {
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

class GreetingsScreenView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br> Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br> Задача кажется тривиальной,
            но не думай, что все так просто.<br> Фотореализм обманчив и коварен.<br> Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
    `;
  }

  _bind() {
    const button = this.element.querySelector(`.greeting__continue`);

    button.addEventListener(`click`, () => this.continueHandler());
  }

  continueHandler() {}
}

class RulesScreenView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото <img src="img/photo_icon.png" width="16" height="16"> или рисунок <img src="img/paint_icon.png"
            width="16" height="16" alt="">.<br> Фотографиями или рисунками могут быть оба изображения.<br> На каждую попытку
          отводится 30 секунд.<br> Ошибиться можно не более 3 раз.<br>
          <br> Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </div>
    `;
  }

  _bind() {
    const form = this.element.querySelector(`.rules__form`);
    const input = form.querySelector(`.rules__input`);
    const button = form.querySelector(`.rules__button`);

    input.addEventListener(`input`, (evt) => {
      button.disabled = evt.target.value ? false : true;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      this.formSubmitHandler(input.value);
    });
  }

  formSubmitHandler() {}
}

class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const headerStateTemplate = (state) => `
      <h1 class="game__timer">${state.time}</h1>
      <div class="game__lives">
        ${new Array(3 - state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
        ${new Array(state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>
    `;
    return `
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      ${(this.state) ? headerStateTemplate(this.state) : ``}
    `;
  }

  get element() {
    if (!this._element) {
      this._element = this._render();
      this._bind();
      this._startTimer();
    }

    return this._element;
  }

  _bind() {
    const back = this.element.querySelector(`.back`);


    back.addEventListener(`click`, () => this.backClickHandler());
  }

  _startTimer() {
    const gameTimer = this.element.querySelector(`.game__timer`);

    if (!gameTimer) {
      return false;
    }
    const timer = {
      leftTime: this.state.time,
      isActive: true,
      tick() {
        this.leftTime--;
        if (!this.leftTime) {
          this.isActive = false;
        }
      }
    };
    this.timer = setInterval(() => {
      if (!timer.isActive) {
        this.stopTimer();
        this.finishTimeHandler(false);
      } else {
        timer.tick();
        this.changeTimeHandler(timer.leftTime);
        gameTimer.textContent = timer.leftTime;
      }
    }, 1000);

    return this.timer;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  backClickHandler() {}

  finishTimeHandler() {}

  changeTimeHandler() {}
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
  constructor(application) {
    this.application = application;
    this.header = new HeaderView();
    this.greetingsScreen = new GreetingsScreenView();
    this.rulesScreen = new RulesScreenView();
  }

  init() {
    this.greetingsScreen.continueHandler = () => this.renderRulesScreen();

    showScreen(this.greetingsScreen.element);
  }

  renderRulesScreen() {
    this.header.backClickHandler = () => this.application.showIntro();
    this.rulesScreen.formSubmitHandler = (name) => this.application.showGame(name);

    showScreen(this.rulesScreen.element, this.header.element);
  }
}

return IntroScreenController;

}());

//# sourceMappingURL=welcomeScreenController.js.map
