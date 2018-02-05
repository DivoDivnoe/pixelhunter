import HeaderView from '../header/headerView';
import showScreen from '../showScreen';
import FirstGameScreenView from '../game/firstGameScreenView';
import SecondGameScreenView from '../game/secondGameScreenView';
import ThirdGameScreenView from '../game/thirdGameScreenView';
import * as constants from '../config/config';

class GameScreenController {
  constructor(application) {
    this.application = application;
    this.model = application.model;

    this.routes = {
      [constants.QuestionType.TWO_OF_TWO]: FirstGameScreenView,
      [constants.QuestionType.TINDER_LIKE]: SecondGameScreenView,
      [constants.QuestionType.ONE_OF_THREE]: ThirdGameScreenView
    };
  }

  initHeader() {
    const headerElement = new HeaderView(this.model.state);

    headerElement.backClickHandler = () => {
      this.model.resetState(this.model.state.questions, this.model.state.imagesData);
      this.application.showWelcome();
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

export default GameScreenController;
