var data = (function (exports) {
'use strict';

const NUM_OF_LIVES = 3;
const TIME_PER_SCREEN = 30;

const initialState = {
  name: null,
  result: null,
  time: TIME_PER_SCREEN,
  lives: NUM_OF_LIVES,
  answers: [],
  questionNumber: 0,
  questions: null
};

exports.initialState = initialState;

return exports;

}({}));

//# sourceMappingURL=data.js.map
