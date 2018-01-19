const countPoints = (answers, lives) => {
  if (
    !lives ||
    answers.length < 10 ||
    answers.filter((answer) => !answer.answer).length > 2
  ) {
    return -1;
  }

  const points = {
    LIVE_POINTS: 50,
    FAST_ANSWER_POINTS: 150,
    MEDIUM_ANSWER_POINTS: 100,
    SLOW_ANSWER_POINTS: 50
  };

  return (
    answers.reduce((acc, answer) => {
      let result = acc;

      if (!answer.answer) {
        return result;
      }

      if (answer.time < 10) {
        result += points.FAST_ANSWER_POINTS;
      } else if (answer.time < 20) {
        result += points.MEDIUM_ANSWER_POINTS;
      } else {
        result += points.SLOW_ANSWER_POINTS;
      }

      return result;
    }, 0) +
    lives * points.LIVE_POINTS
  );
};

export default countPoints;
