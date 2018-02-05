import IntroScreenController from './intro/introScreenController';
import WelcomeScreenController from './intro/welcomeScreenController';
import GameScreenController from './game/gameScreenController';
import StatsScreenController from './stats/statsScreenController';
import Model from './model/model';
import loadImage from './loadImage';

const ControllerId = {
  INTRO: ``,
  WELCOME: `welcome`,
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
        .then(() => this.showWelcome())
        .catch(console.error);
  }

  _setup() {
    this.routes = {
      [ControllerId.INTRO]: IntroScreenController,
      [ControllerId.WELCOME]: WelcomeScreenController,
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
  showWelcome() {
    location.hash = ControllerId.WELCOME;
  }
  showGame() {
    location.hash = ControllerId.GAME;
  }
  showStats() {
    location.hash = ControllerId.STATS;
  }
  init() {
    this._hashChangeHandler();
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

export default Application;
