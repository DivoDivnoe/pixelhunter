var model = (function () {
'use strict';

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

const NUM_OF_LIVES = 3;
const TIME_PER_SCREEN = 30;
const SLOW_ANSWER_TIME_BOTTOM_LIMIT = 20;
const FAST_ASWER_TIME_UPPER_LIMIT = 10;
const API_URL = `https://es.dump.academy/pixel-hunter`;

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

return Model;

}());

//# sourceMappingURL=model.js.map
