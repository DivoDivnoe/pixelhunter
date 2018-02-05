var countPoints = (function () {
'use strict';

const POINTS_FOR_RIGHT_ANSWER = 100;
const BONUS_POINTS_FOR_SPEED = 50;
const BONUS_POINTS_FOR_LIVE = 50;
const PENALTY_FOR_SLOWNESS = 50;
const Answer = {
  FAIL: `fail`,
  SLOW: `slow`,
  NORMAL: `right`,
  FAST: `fast`
};

const countPoints = (answers, lives) => {
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

    result.rightAnswerPoints += POINTS_FOR_RIGHT_ANSWER;

    switch (answer) {
      case Answer.FAST: {
        result.speedBonus += BONUS_POINTS_FOR_SPEED;
        break;
      }
      case Answer.SLOW: {
        result.slowPenalty += PENALTY_FOR_SLOWNESS;
      }
    }
  }

  result.livesBonus = lives * BONUS_POINTS_FOR_LIVE;
  result.total = result.rightAnswerPoints + result.speedBonus + result.livesBonus - result.slowPenalty;

  return result;
};

return countPoints;

}());

//# sourceMappingURL=countPoints.js.map
