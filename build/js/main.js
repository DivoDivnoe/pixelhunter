(function () {
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

class IntroScreenView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro intro--hidden">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
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
    const greeting = this.element.querySelector(`.greeting`);
    const button = this.element.querySelector(`.greeting__continue`);

    button.addEventListener(`click`, () => {
      this.continueHandler();
      greeting.classList.remove(`greeting--active`);
    });
  }

  showWelcome() {
    const greeting = this.element.querySelector(`.greeting`);

    greeting.classList.remove(`greeting--hidden`);
  }

  hideWelcome() {
    const greeting = this.element.querySelector(`.greeting`);

    greeting.classList.add(`greeting--hidden`);
  }

  show() {
    const intro = this.element.querySelector(`.intro--hidden`);

    intro.classList.remove(`intro--hidden`);
  }

  hide() {
    const intro = this.element.querySelector(`.intro`);

    intro.classList.add(`intro--hidden`);
  }

  continueHandler() {}
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

class IntroScreenController {
  constructor(application) {
    this.application = application;
    this.header = new HeaderView();
    this.rulesScreen = new RulesScreenView();
    this.introScreen = new IntroScreenView();
  }

  init() {
    this.introScreen.continueHandler = () => this.renderRulesScreen();

    showScreen(this.introScreen.element);
  }

  showPreloader() {
    this.introScreen.show();
  }

  hidePreloader() {
    this.introScreen.hide();
  }

  hideGreetingsScreen() {
    this.introScreen.hideWelcome();
  }

  showGreetingsScreen() {
    this.introScreen.showWelcome();
  }

  renderRulesScreen() {
    this.header.backClickHandler = () => this.application.showIntro();
    this.rulesScreen.formSubmitHandler = (name) => this.application.showGame(name);

    showScreen(this.rulesScreen.element, this.header.element);
  }
}

const NUM_OF_LIVES = 3;
const TIME_PER_SCREEN = 30;
const POINTS_FOR_RIGHT_ANSWER = 100;
const BONUS_POINTS_FOR_SPEED = 50;
const BONUS_POINTS_FOR_LIVE = 50;
const PENALTY_FOR_SLOWNESS = 50;
const SLOW_ANSWER_TIME_BOTTOM_LIMIT = 20;
const FAST_ASWER_TIME_UPPER_LIMIT = 10;
const NUM_OF_QUESTIONS = 10;
const API_URL = `https://es.dump.academy/pixel-hunter`;

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
const Result = {
  LOSS: `loss`,
  WIN: `win`
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
      this.model.resetState(this.model.state.questions, this.model.state.imagesData);
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

const countPoints = (answers, lives) => {
  const result = {
    total: 0,
    rightAnswerPoints: 0,
    speedBonus: 0,
    livesBonus: 0,
    slowPenalty: 0
  };

  for (const answer of answers) {
    if (!answer) {
      continue;
    }

    result.rightAnswerPoints += POINTS_FOR_RIGHT_ANSWER;

    switch (answer) {
      case Answer.FAST: {
        result.speedBonus += BONUS_POINTS_FOR_SPEED;
        break;
      }
      case Answer.SLOW: {
        result.slowPenalty += PENALTY_FOR_SLOWNESS;
      }
    }
  }

  result.livesBonus = lives * BONUS_POINTS_FOR_LIVE;
  result.total = result.rightAnswerPoints + result.speedBonus + result.livesBonus - result.slowPenalty;

  return result;
};

class StatsScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const points = countPoints(this.state.answers, this.state.lives);

    const resultTable = (results, index) => {
      const result = results.lives ? countPoints(results.stats, results.lives).total : `FAIL`;

      return `
        <table class="result__table">
          <tr>
            <td class="result__number">${index + 2}.</td>
            <td colspan="2">
              ${gameStats(results.stats)}
            </td>
            <td class="result__total--final">${result}</td>
          </tr>
        </table>
      `;
    };

    return `
      <div class="result">
        <h1>${this.state.result === Result.WIN ? `Победа!` : `Вы проиграли!`}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${gameStats(this.state.answers)}
            </td>
            <td class="result__points">×&nbsp;${POINTS_FOR_RIGHT_ANSWER}</td>
            <td class="result__total">${this.state.result === Result.WIN ? points.rightAnswerPoints : `FAIL`}</td>
          </tr>
          ${this.state.result === Result.WIN
    ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${points.speedBonus / BONUS_POINTS_FOR_SPEED}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${BONUS_POINTS_FOR_SPEED}</td>
          <td class="result__total">${points.speedBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${points.livesBonus / BONUS_POINTS_FOR_LIVE}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${BONUS_POINTS_FOR_LIVE}</td>
          <td class="result__total">${points.livesBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${points.slowPenalty / PENALTY_FOR_SLOWNESS}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${PENALTY_FOR_SLOWNESS}</td>
          <td class="result__total">${points.slowPenalty}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${points.total}</td>
        </tr>
      `
    : ``}
        </table>
      </div>
      ${this.state.stats ? this.state.stats.slice(0, -1).map(resultTable).join(``) : ``}
    `;
  }
}

class StatsScreenController {
  constructor(application) {
    this.application = application;
    this.model = application.model;
    this.screen = new StatsScreenView(this.model.state);
    this.header = new HeaderView();
  }

  init() {
    const stats = this.model.state.answers;
    const lives = this.model.state.lives;

    this.model.save({stats, lives})
        .then(() => this.model.loadStatistics())
        .then(() => showScreen(this.screen.element, this.header.element));
    this.header.backClickHandler = () => {
      this.model.resetState(this.model.state.questions, this.model.state.imagesData);
      this.application.showIntro();
    };
  }
}

class AbstractAdapter {
  toServer() {
    throw Error(`Abstract method. Define toServer method`);
  }
}

const defaultAdapter = new class extends AbstractAdapter {
  toServer(data) {
    return JSON.stringify(data);
  }
}();

class AbstractModel {
  get urlRead() {
    throw new Error(`You have to define urlRead`);
  }

  get urlWrite() {
    throw new Error(`You have to define urlWrite`);
  }

  get initialState() {
    throw new Error(`You have to define initialState`);
  }

  load() {
    return fetch(this.urlRead)
        .then((response) => response.json())
        .catch((error) => console.error(error));
  }

  save(data, adapter = defaultAdapter) {
    return fetch(this.urlWrite, {
      method: `POST`,
      body: adapter.toServer(data),
      headers: {
        'Content-Type': `application/json`
      }
    });
  }
}

class Model extends AbstractModel {
  get urlRead() {
    return `${API_URL}/questions`;
  }

  get urlWrite() {
    return `${API_URL}/stats/:Andron1`;
  }

  get statsUrlRead() {
    return `${API_URL}/stats/:Andron1`;
  }

  get initialState() {
    return {
      name: null,
      result: null,
      time: TIME_PER_SCREEN,
      lives: NUM_OF_LIVES,
      answers: [],
      questionNumber: 0,
      questions: null,
      imagesData: null,
      stats: null
    };
  }

  get state() {
    if (!this._state) {
      this._state = this.initialState;
    }

    return this._state;
  }

  set state(anotherState) {
    this._state = anotherState;
  }

  resetState(questions, imagesData) {
    this.state = Object.assign({}, this.initialState, {questions, imagesData});
  }

  load() {
    return super.load()
        .then((data) => {
          this.state.questions = data;
        });
  }

  loadStatistics() {
    return fetch(this.statsUrlRead)
        .then((response) => response.json())
        .then((data) => {
          this.state.stats = data;
        });
  }

  changeState(answer) {
    const time = this.initialState.time - this.state.time;
    let result;

    if (answer) {
      if (time < FAST_ASWER_TIME_UPPER_LIMIT) {
        result = Answer.FAST;
      } else if (time >= SLOW_ANSWER_TIME_BOTTOM_LIMIT) {
        result = Answer.SLOW;
      } else {
        result = Answer.NORMAL;
      }
    } else {
      result = Answer.FAIL;
    }

    this.state = Object.assign({}, this.state, {
      questionNumber: this.state.questionNumber + 1,
      lives: this.state.lives - (answer ? 0 : 1),
      answers: this.state.answers.concat(result),
      time: this.initialState.time
    });

    if (!this.state.lives) {
      this.state = Object.assign({}, this.state, {
        result: Result.LOSS
      });
    } else if (this.state.questionNumber === this.state.questions.length) {
      this.state = (Object.assign({}, this.state, {
        result: Result.WIN
      }));
    }

    return this.state;
  }
}

const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = document.createElement(`img`);

    img.src = url;
    img.addEventListener(`load`, () => {
      const width = img.width;
      const height = img.height;

      resolve({url, width, height});
    });
    img.onerror = (evt) => resolve(evt.target.response);

    setTimeout(resolve, 10000);
  });
};

const ControllerId = {
  INTRO: ``,
  GAME: `game`,
  STATS: `stats`
};

const getControllerFromHash = (hash) => hash ? hash.slice(1) : ``;

class Application {
  constructor() {
    this._setup();
    this.init();
    this.model = new Model();
    this.model.load()
        .then(() => this.loadImages())
        .then(() => {
          this.intro.hidePreloader();
          this.intro.showGreetingsScreen();
        })
        .catch(console.error);
  }

  _setup() {
    this.routes = {
      [ControllerId.INTRO]: IntroScreenController,
      [ControllerId.GAME]: GameScreenController,
      [ControllerId.STATS]: StatsScreenController,
    };
    window.addEventListener(`hashchange`, () => this._hashChangeHandler());
  }

  _hashChangeHandler() {
    const controller = new this.routes[getControllerFromHash(location.hash)](this);

    controller.init();
  }
  showIntro() {
    location.hash = ControllerId.INTRO;
  }
  showGame() {
    location.hash = ControllerId.GAME;
  }
  showStats() {
    location.hash = ControllerId.STATS;
  }
  init() {
    this.intro = new this.routes[ControllerId.INTRO](this);
    this.intro.init();
    this.intro.showPreloader();
    this.intro.hideGreetingsScreen();
  }
  loadImages() {
    const urls = new Set();
    const promises = [];
    this.model.state.questions.forEach((item) => item.answers.forEach((answer) => urls.add(answer.image.url)));
    const imagesData = [];

    for (const url of urls) {
      promises.push(loadImage(url)
          .then((imageData) => imagesData.push(imageData))
      );
    }

    this.model.state.imagesData = imagesData;

    return Promise.all(promises);
  }
}

new Application().init();

}());

//# sourceMappingURL=main.js.map
