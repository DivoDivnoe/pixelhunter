import router from './templates/router';
import renderStatsScreen from './templates/statsScreen';

const continueGame = (state) => {
  return router[state.questions[state.questionNumber].type](state);
};

const checkGameStatus = (state) => {
  if (!state.lives) {
    renderStatsScreen(Object.assign({}, state, {result: `loss`}));
  } else if (state.questionNumber === state.questions.length) {
    renderStatsScreen(Object.assign({}, state, {result: `win`}));
  } else {
    continueGame(state);
  }
};

export default checkGameStatus;
