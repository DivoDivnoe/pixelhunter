import getElementFromTemplate from './getElement';
import showScreen from './render';
import greeting from './greeting';

const introTemplate = document.querySelector('.central').innerHTML;

const intro = getElementFromTemplate(introTemplate);
const asterix = intro.querySelector('.intro__asterisk');

asterix.addEventListener('click', () => {
  showScreen(greeting);
});

export default intro;
