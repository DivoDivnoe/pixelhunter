var gameScreenController = (function () {
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

  get frame() {
    throw new Error(`You have to define frame dimensions`);
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

const NUM_OF_QUESTIONS = 10;
const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

const Answer = {
  FAIL: `fail`,
  SLOW: `slow`,
  NORMAL: `right`,
  FAST: `fast`
};
const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

const router = {
  [Answer.SLOW]: `<li class="stats__result stats__result--slow"></li>`,
  [Answer.NORMAL]: `<li class="stats__result stats__result--correct"></li>`,
  [Answer.FAST]: `<li class="stats__result stats__result--fast"></li>`,
  [Answer.FAIL]: `<li class="stats__result stats__result--wrong"></li>`
};

const gameStats = (answers) => `
  <ul class="stats">
    ${answers.map((answer) => router[answer]).join(``)}
    ${new Array(NUM_OF_QUESTIONS - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

const resize = (frame, given) => {
  if (!given) {
    return frame;
  }

  const ratio = given.width / given.height;
  const outOffsetWidth = given.width - frame.width;
  const outOffsetHeight = given.height - frame.height;
  const result = {};

  if (outOffsetWidth >= outOffsetHeight) {
    result.width = frame.width;
    result.height = Math.round(result.width / ratio);
  } else {
    result.height = frame.height;
    result.width = Math.round(result.height * ratio);
  }

  return result;
};

class FirstGameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get frame() {
    return {
      width: 468,
      height: 458
    };
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];

    const question = (item, index) => {
      const imageData = this.state.imagesData.find((image) => image.url === item.image.url);
      const width = imageData.width;
      const height = imageData.height;
      const dimensions = resize(this.frame, {width, height});

      return `
        <div class="game__option">
          <img src=${item.image.url} alt="Option ${index}" width=${dimensions.width} height=${dimensions.height}>
          <label class="game__answer  game__answer--photo">
            <input name="question${index + 1}" type="radio" value=${AnswerType.PHOTO}>
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question${index + 1}" type="radio" value=${AnswerType.PAINTING}>
            <span>Рисунок</span>
          </label>
        </div>
      `;
    };

    return `
      <div class="game">
        <p class="game__task">${game.question}</p>
        <form class="game__content">
          ${game.answers.map(question).join(``)}
        </form>
        <div class="stats">${gameStats(this.state.answers).trim()}</div>
      </div>
    `;
  }

  _bind() {
    const form = this.element.querySelector(`.game__content`);
    const inputs = form.querySelectorAll(`input[type="radio"]`);

    [...inputs].forEach((input) => input.addEventListener(`change`, () => {
      const value1 = form.question1.value;
      const value2 = form.question2.value;

      if (!(value1 && value2)) {
        return false;
      }

      const game = this.state.questions[this.state.questionNumber];
      const answer = value1 === game.answers[0][`type`] && value2 === game.answers[1][`type`];

      this.answerHandler(answer);

      return answer;
    }));
  }

  answerHandler() {}
}

class SecondGameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get frame() {
    return {
      width: 705,
      height: 455
    };
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];
    const imageData = this.state.imagesData.find((image) => image.url === game.answers[0].image.url);
    const width = imageData.width;
    const height = imageData.height;
    const dimensions = resize(this.frame, {width, height});

    return `
      <div class="game">
        <p class="game__task">${game.question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src=${game.answers[0].image.url} alt="Option 1" width=${dimensions.width} height=${dimensions.height}>
            <label class="game__answer  game__answer--photo">
              <input name="question1" type="radio" value=${AnswerType.PHOTO}>
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question1" type="radio" value=${AnswerType.PAINTING}>
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        <div class="stats">${gameStats(this.state.answers)}</div>
      </div>
    `;
  }

  _bind() {
    const form = this.element.querySelector(`.game__content--wide`);
    const answers = form.querySelectorAll(`input[name="question1"]`);
    const game = this.state.questions[this.state.questionNumber];

    [...answers].forEach((item) => item.addEventListener(`change`, () => {
      const answer = form.question1.value === game.answers[0].type;

      this.answerHandler(answer);
    }));
  }

  answerHandler() {}
}

class ThirdGameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get frame() {
    return {
      width: 304,
      height: 455
    };
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];
    const question = (item, index) => {
      const imageData = this.state.imagesData.find((image) => image.url === item.image.url);
      const width = imageData.width;
      const height = imageData.height;
      const dimensions = resize(this.frame, {width, height});

      return `
        <div class="game__option">
          <img src=${item.image.url} alt="Option ${index + 1}" width=${dimensions.width} height=${dimensions.height}>
        </div>
      `;
    };

    return `
      <div class="game">
        <p class="game__task">${game.question}</p>
        <form class="game__content  game__content--triple">
          ${game.answers.map(question).join(``)}
        </form>
        <div class="stats">${gameStats(this.state.answers)}</div>
      </div>
    `;
  }

  _bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    const game = this.state.questions[this.state.questionNumber];

    [...options].forEach((option) => option.addEventListener(`click`, (evt) => {
      const target = evt.target;
      const answers = game.answers;
      let type = answers[0].type;

      for (let i = 1; i < answers.length; i++) {
        if (answers[i].type === type) {
          type = answers.find((item) => item.type !== type).type;
          break;
        }
      }

      const answer = [...options].indexOf(target) === game.answers.findIndex((item) => item.type === type);

      this.answerHandler(answer);
    }));
  }

  answerHandler() {}
}

class GameScreenController {
  constructor(application) {
    this.application = application;
    this.model = application.model;

    this.routes = {
      [QuestionType.TWO_OF_TWO]: FirstGameScreenView,
      [QuestionType.TINDER_LIKE]: SecondGameScreenView,
      [QuestionType.ONE_OF_THREE]: ThirdGameScreenView
    };
  }

  initHeader() {
    const headerElement = new HeaderView(this.model.state);

    headerElement.backClickHandler = () => {
      this.model.resetState(this.model.state.questions);
      this.application.showIntro();
    };
    headerElement.changeTimeHandler = (time) => this.changeTime(time);
    headerElement.finishTimeHandler = (answer) => this.finishTime(answer);

    this.header = headerElement;
  }

  get screen() {
    if (!this._screen) {
      this._screen = this.initScreen();
    }

    return this._screen;
  }

  set screen(scr) {
    this._screen = scr;
  }

  changeTime(time) {
    this.model.state = Object.assign({}, this.model.state, {time});

    return this.model.state;
  }

  finishTime(answer) {
    this.continueGameHandler(answer);
  }

  initScreen() {
    const game = this.model.state.questions[this.model.state.questionNumber];

    return new this.routes[game.type](this.model.state);
  }

  init() {
    this.checkGameStatus(this.model.state);
  }

  checkGameStatus() {
    if (this.model.state.result) {
      this.application.showStats();
    } else {
      this.continueGame();
    }
  }

  continueGame() {
    this.screen = this.initScreen();
    this.screen.answerHandler = (answer) => this.continueGameHandler(answer);
    this.initHeader();

    showScreen(this.screen.element, this.header.element);
  }

  continueGameHandler(answer) {
    this.header.stopTimer();
    this.model.changeState(answer);
    this.checkGameStatus();
  }
}

return GameScreenController;

}());

//# sourceMappingURL=gameScreenController.js.map
