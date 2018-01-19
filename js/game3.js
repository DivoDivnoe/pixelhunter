import getElementFromTemplate from './getElement';
import showScreen from './render';
import stats from './stats';
import intro from './intro';

const game3Template = document.querySelector(`#game-3`).innerHTML;

const game3 = getElementFromTemplate(game3Template);
const answers = game3.querySelectorAll(`.game__option`);
const back = game3.querySelector(`.back`);

[...answers].forEach((answer) => {
  answer.addEventListener(`click`, () => showScreen(stats));
});

back.addEventListener(`click`, () => showScreen(intro));

export default game3;
