import getElementFromTemplate from './getElement';
import showScreen from './render';
import game1 from './game1';
import intro from './intro';

const rulesTemplate = document.querySelector('#rules').innerHTML;

const rules = getElementFromTemplate(rulesTemplate);
const form = rules.querySelector('.rules__form');
const input = form.querySelector('.rules__input');
const button = form.querySelector('.rules__button');
const back = rules.querySelector('.back');

input.addEventListener('input', evt => {
  button.disabled = evt.target.value ? false : true;
});
form.addEventListener('submit', () => showScreen(game1));

back.addEventListener('click', () => showScreen(intro));

export default rules;
