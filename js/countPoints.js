import * as constants from './config/config';

const countPoints = (state) => {
  const answers = state.answers;
  const lives = state.lives;

  if (
    !lives ||
    answers.length < state.questions.length
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
    if (!answer) {
      continue;
    }

    result.rightAnswerPoints += constants.POINTS_FOR_RIGHT_ANSWER;

    switch (answer) {
      case constants.Answer.FAST: {
        result.speedBonus += constants.BONUS_POINTS_FOR_SPEED;
        break;
      }
      case constants.Answer.SLOW: {
        result.slowPenalty += constants.PENALTY_FOR_SLOWNESS;
      }
    }
  }

  result.livesBonus = lives * constants.BONUS_POINTS_FOR_LIVE;
  result.total = result.rightAnswerPoints + result.speedBonus + result.livesBonus - result.slowPenalty;

  return result;
};

export default countPoints;
