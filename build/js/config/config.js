var config = (function (exports) {
'use strict';

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

exports.NUM_OF_LIVES = NUM_OF_LIVES;
exports.TIME_PER_SCREEN = TIME_PER_SCREEN;
exports.POINTS_FOR_RIGHT_ANSWER = POINTS_FOR_RIGHT_ANSWER;
exports.BONUS_POINTS_FOR_SPEED = BONUS_POINTS_FOR_SPEED;
exports.BONUS_POINTS_FOR_LIVE = BONUS_POINTS_FOR_LIVE;
exports.PENALTY_FOR_SLOWNESS = PENALTY_FOR_SLOWNESS;
exports.SLOW_ANSWER_TIME_BOTTOM_LIMIT = SLOW_ANSWER_TIME_BOTTOM_LIMIT;
exports.FAST_ASWER_TIME_UPPER_LIMIT = FAST_ASWER_TIME_UPPER_LIMIT;
exports.NUM_OF_QUESTIONS = NUM_OF_QUESTIONS;
exports.API_URL = API_URL;
exports.QuestionType = QuestionType;
exports.AnswerType = AnswerType;
exports.Answer = Answer;
exports.Result = Result;

return exports;

}({}));

//# sourceMappingURL=config.js.map
