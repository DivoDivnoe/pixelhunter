import router from './router';
import renderStatsScreen from './stats/statsScreen';
import countPoints from './countPoints';

const continueGame = (state) => {
  return router[state.questions[state.questionNumber].type](state);
};

const checkGameStatus = (state) => {
  if (!state.lives) {
    renderStatsScreen(Object.assign({}, state, {result: `loss`}));
  } else if (state.questionNumber === state.questions.length) {
    renderStatsScreen(Object.assign({}, state, {
      result: `win`,
      points: countPoints(state)
    }));
  } else {
    continueGame(state);
  }
};

export default checkGameStatus;
