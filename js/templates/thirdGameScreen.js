import gameStats from './gameStats';
import getElementFromTemplate from '../getElement';
import showScreen from '../showScreen';
import checkGameStatus from '../checkGameStatus';
import header from './header';
import getNextState from '../getNextState';

const question = (item, index) => `
  <div class="game__option">
    <img src=${item.img} alt="Option ${index + 1}" width="304" height="455">
  </div>
`;

const thirdGameTemplate = (state) => {
  const game = state.questions[state.questionNumber];

  return `
    <div class="game">
      <p class="game__task">${game.title}</p>
      <form class="game__content  game__content--triple">
        ${game.items.map(question).join(``)}
      </form>
      <div class="stats">${gameStats(state.answers)}</div>
    </div>
  `;
};

const renderThirdGameScreen = (state) => {
  const game = state.questions[state.questionNumber];

  const thirdGameScreen = getElementFromTemplate(thirdGameTemplate(state));
  const answers = thirdGameScreen.querySelectorAll(`.game__option`);

  const imageClickHandler = (evt) => {
    const target = evt.target;

    const answer = [...answers].indexOf(target) === game.items.findIndex((item) => item.answer);
    const nextState = getNextState(state, answer);

    return checkGameStatus(nextState);
  };

  [...answers].forEach((answer) => answer.addEventListener(`click`, imageClickHandler));

  showScreen(thirdGameScreen, header(state));
};

export default renderThirdGameScreen;
