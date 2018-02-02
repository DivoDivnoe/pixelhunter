import * as constants from './config/config';
import {initialState} from './model/data';

const countPoints = (state) => {
  const answers = state.answers;
  const lives = state.lives;

  if (
    !lives ||
    answers.length < initialState.questions.length
  ) {
    return -1;
  }

  const result = {
    total: 0,
    rightAnswerPoints: 0,
    speedBonus: 0,
    livesBonus: 0,
    slowPenalty: 0
  };

  for (const answer of answers) {
    if (!answer.answer) {
      continue;
    }

    if (answer.time < constants.FAST_ASWER_TIME_UPPER_LIMIT) {
      result.speedBonus += constants.BONUS_POINTS_FOR_SPEED;
    } else if (answer.time >= constants.SLOW_ANSWER_TIME_BOTTOM_LIMIT) {
      result.slowPenalty += constants.PENALTY_FOR_SLOWNESS;
    }

    result.rightAnswerPoints += constants.POINTS_FOR_RIGHT_ANSWER;
  }

  result.livesBonus = lives * constants.BONUS_POINTS_FOR_LIVE;
  result.total = result.rightAnswerPoints + result.speedBonus + result.livesBonus - result.slowPenalty;

  return result;
};

export default countPoints;
