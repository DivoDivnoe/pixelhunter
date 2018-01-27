import gameStats from './gameStats';
import getElementFromTemplate from '../getElement';
import showScreen from '../showScreen';
import checkGameStatus from '../checkGameStatus';
import header from './header';
import getNextState from '../getNextState';

const question = (item, index) => `
  <div class="game__option">
    <img src=${item.img} alt="Option ${index}" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input name="question${index + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input name="question${index + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
`;

const firstGameTemplate = (state) => {
  const game = state.questions[state.questionNumber];

  return `
    <div class="game">
      <p class="game__task">${game.title}</p>
      <form class="game__content">
        ${game.items.map(question).join(``)}
      </form>
      <div class="stats">${gameStats(state.answers)}</div>
    </div>
  `;
};

const renderFirstGameScreen = (state) => {
  const game = state.questions[state.questionNumber];

  const firstGameScreen = getElementFromTemplate(firstGameTemplate(state));
  const form = firstGameScreen.querySelector(`.game__content`);
  const inputs = form.querySelectorAll(`input[type="radio"]`);

  const inputChangeHandler = () => {
    if (!(form.question1.value && form.question2.value)) {
      return false;
    }

    const answer = form.question1.value === game.items[0][`answer`] && form.question2.value === game.items[1][`answer`];
    const nextState = getNextState(state, answer);

    return checkGameStatus(nextState);
  };

  [...inputs].forEach((input) => input.addEventListener(`change`, inputChangeHandler));

  showScreen(firstGameScreen, header(state));
};

export default renderFirstGameScreen;
