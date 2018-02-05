const NUM_OF_LIVES = 3;
const TIME_PER_SCREEN = 30;
const POINTS_FOR_RIGHT_ANSWER = 100;
const BONUS_POINTS_FOR_SPEED = 50;
const BONUS_POINTS_FOR_LIVE = 50;
const PENALTY_FOR_SLOWNESS = 50;
const SLOW_ANSWER_TIME_BOTTOM_LIMIT = 20;
const FAST_ASWER_TIME_UPPER_LIMIT = 10;
const NUM_OF_QUESTIONS = 10;

const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

const Answer = {
  FAIL: 0,
  SLOW: 1,
  NORMAL: 2,
  FAST: 3
};
const Result = {
  LOSS: `loss`,
  WIN: `win`
};

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export {
  NUM_OF_LIVES,
  TIME_PER_SCREEN,
  POINTS_FOR_RIGHT_ANSWER,
  BONUS_POINTS_FOR_SPEED,
  BONUS_POINTS_FOR_LIVE,
  PENALTY_FOR_SLOWNESS,
  SLOW_ANSWER_TIME_BOTTOM_LIMIT,
  FAST_ASWER_TIME_UPPER_LIMIT,
  NUM_OF_QUESTIONS,
  QuestionType,
  AnswerType,
  Answer,
  Result
};
