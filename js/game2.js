import getElementFromTemplate from './getElement';
import showScreen from './render';
import game3 from './game3';
import intro from './intro';
import findCheckedInput from './findCheckedInput';

const game2Template = document.querySelector(`#game-2`).innerHTML;

const game2 = getElementFromTemplate(game2Template);
const answers = game2.querySelectorAll(`input[name="question1"]`);
const back = game2.querySelector(`.back`);

[...answers].forEach((answer) => {
  answer.addEventListener(`change`, () => {
    if (findCheckedInput([...answers])) {
      showScreen(game3);
    }
  });
});

back.addEventListener(`click`, () => showScreen(intro));

export default game2;
