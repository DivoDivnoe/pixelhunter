import gameStats from './gameStats';
import getElementFromTemplate from '../getElement';
import showScreen from '../showScreen';
import checkGameStatus from '../checkGameStatus';
import header from './header';
import getNextState from '../getNextState';

const secondGameTemplate = (state) => {
  const game = state.questions[state.questionNumber];

  return `
    <div class="game">
      <p class="game__task">${game.title}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src=${game.img} alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      <div class="stats">${gameStats(state.answers)}</div>
    </div>
  `;
};

const renderSecondGameScreen = (state) => {
  const game = state.questions[state.questionNumber];

  const secondGameScreen = getElementFromTemplate(secondGameTemplate(state));
  const form = secondGameScreen.querySelector(`.game__content--wide`);
  const answers = form.querySelectorAll(`input[name="question1"]`);

  const inputChangeHandler = () => {
    const answer = form.question1.value === game.answer;
    const nextState = getNextState(state, answer);

    return checkGameStatus(nextState);
  };

  [...answers].forEach((answer) => answer.addEventListener(`change`, inputChangeHandler));

  showScreen(secondGameScreen, header(state));
};

export default renderSecondGameScreen;
