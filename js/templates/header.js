import renderIntroScreen from './introScreen';
import getElementFromTemplate from '../getElement';

const stateTemplate = (state) => `
  <h1 class="game__timer">${state.time}</h1>
  <div class="game__lives">
    ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
  </div>
`;

const headerTemplate = (state) =>`
  <div class="header__back">
    <button class="back">
      <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
      <img src="img/logo_small.svg" width="101" height="44">
    </button>
  </div>
  ${(state) ? stateTemplate(state) : ``}
`;

const header = (state) => {
  const headerElement = getElementFromTemplate(headerTemplate(state));
  const back = headerElement.querySelector(`.back`);

  back.addEventListener(`click`, renderIntroScreen);

  return headerElement;
};

export default header;
