const nextState = (state, answer) => Object.assign({}, state, {
  questionNumber: state.questionNumber + 1,
  lives: state.lives - (answer ? 0 : 1),
  answers: state.answers.concat({
    answer,
    time: 15
  })
});

export default nextState;
