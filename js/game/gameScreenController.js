import HeaderView from '../header/headerView';
import showScreen from '../showScreen';
import FirstGameScreenView from '../game/firstGameScreenView';
import SecondGameScreenView from '../game/secondGameScreenView';
import ThirdGameScreenView from '../game/thirdGameScreenView';
import * as constants from '../config/config';

const Game = {
  FIRST_GAME: `game1`,
  SECOND_GAME: `game2`,
  THIRD_GAME: `game3`
};

class GameScreenController {
  constructor(application) {
    this.application = application;
    this.state = application.state;
    this.duration = this.state.time;

    this.routes = {
      [Game.FIRST_GAME]: FirstGameScreenView,
      [Game.SECOND_GAME]: SecondGameScreenView,
      [Game.THIRD_GAME]: ThirdGameScreenView
    };
  }

  initHeader() {
    const headerElement = new HeaderView(this.state);

    headerElement.backClickHandler = () => this.application.showIntro();
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
    this.state = Object.assign({}, this.state, {time});

    return this.state;
  }

  finishTime(answer) {
    this.continueGameHandler(answer);
  }

  initScreen() {
    const game = this.state.questions[this.state.questionNumber];

    return new this.routes[game.type](this.state);
  }

  init() {
    this.checkGameStatus(this.state);
  }

  checkGameStatus() {
    if (!this.state.lives) {
      this.application.showStats(Object.assign({}, this.state, {result: constants.Result.LOSS}));
    } else if (this.state.questionNumber === this.state.questions.length) {
      this.application.showStats(Object.assign({}, this.state, {
        result: constants.Result.WIN
      }));
    } else {
      this.continueGame();
    }
  }

  getNextState(answer) {
    const time = this.duration - this.state.time;
    let result;

    if (answer) {
      if (time < constants.FAST_ASWER_TIME_UPPER_LIMIT) {
        result = constants.Answer.FAST;
      } else if (time >= constants.SLOW_ANSWER_TIME_BOTTOM_LIMIT) {
        result = constants.Answer.SLOW;
      } else {
        result = constants.Answer.NORMAL;
      }
    } else {
      result = constants.Answer.FAIL;
    }

    this.state = Object.assign({}, this.state, {
      questionNumber: this.state.questionNumber + 1,
      lives: this.state.lives - (answer ? 0 : 1),
      answers: this.state.answers.concat(result),
      time: this.duration
    });

    return this.state;
  }

  continueGame() {
    this.screen = this.initScreen();
    this.screen.answerHandler = (answer) => this.continueGameHandler(answer);
    this.initHeader();

    showScreen(this.screen.element, this.header.element);
  }

  continueGameHandler(answer) {
    this.header.stopTimer();
    this.getNextState(answer);
    this.checkGameStatus();
  }
}

export default GameScreenController;
