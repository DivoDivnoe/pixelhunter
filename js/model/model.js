import AbstractModel from './abstractModel';
import * as constants from '../config/config';

class Model extends AbstractModel {
  get urlRead() {
    return `${constants.API_URL}/questions`;
  }

  get urlWrite() {
    return `${constants.API_URL}/stats/:Andron1`;
  }

  get statsUrlRead() {
    return `${constants.API_URL}/stats/:Andron1`;
  }

  get initialState() {
    return {
      name: null,
      result: null,
      time: constants.TIME_PER_SCREEN,
      lives: constants.NUM_OF_LIVES,
      answers: [],
      questionNumber: 0,
      questions: null,
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

  resetState(gameItems) {
    this.state = gameItems ? Object.assign({}, this.initialState, {questions: gameItems}) : this.initialState;
  }

  load() {
    return super.load()
        .then((data) => {
          this.state.questions = data;

          return this.loadStatistics();
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
      time: this.initialState.time
    });

    if (!this.state.lives) {
      this.state = Object.assign({}, this.state, {
        result: constants.Result.LOSS
      });
    } else if (this.state.questionNumber === this.state.questions.length) {
      this.state = (Object.assign({}, this.state, {
        result: constants.Result.WIN
      }));
    }

    return this.state;
  }
}

export default Model;
