import getElementFromTemplate from './getElement';
import showScreen from './render';
import intro from './intro';

const statsTemplate = document.querySelector('#stats').innerHTML;

const stats = getElementFromTemplate(statsTemplate);
const back = stats.querySelector('.back');

back.addEventListener('click', () => showScreen(intro));

export default stats;
