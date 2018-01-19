import getElementFromTemplate from './getElement';
import showScreen from './render';
import rules from './rules';

const greetingTemplate = document.querySelector(`#greeting`).innerHTML;

const greeting = getElementFromTemplate(greetingTemplate);
const button = greeting.querySelector(`.greeting__continue`);

button.addEventListener(`click`, () => showScreen(rules));

export default greeting;
