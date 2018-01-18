import getElementFromTemplate from './getElement';
import showScreen from './render';
import game2 from './game2';
import intro from './intro';
import findCheckedInput from './findCheckedInput';

const game1Template = document.querySelector('#game-1').innerHTML;

const game1 = getElementFromTemplate(game1Template);
const inputs = game1.querySelectorAll('input[type="radio"]');
const firstQuestionInputs = game1.querySelectorAll('input[name="question1"]');
const secondQuestionInputs = game1.querySelectorAll('input[name="question2"]');
const back = game1.querySelector('.back');

[...inputs].forEach(input => {
  input.addEventListener('change', () => {
    if (
      findCheckedInput([...firstQuestionInputs]) &&
      findCheckedInput([...secondQuestionInputs])
    ) {
      showScreen(game2);
    }
  });
});

back.addEventListener('click', () => showScreen(intro));

export default game1;
