import abstractView from '../view/abstractView';

class HeaderView extends abstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const headerStateTemplate = (state) => `
      <h1 class="game__timer">${state.time}</h1>
      <div class="game__lives">
        ${new Array(3 - state.lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
        ${new Array(state.lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`)
      .join(``)}
      </div>
    `;
    return `
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      ${(this.state) ? headerStateTemplate(this.state) : ``}
    `;
  }

  _bind() {
    const back = this.element.querySelector(`.back`);

    back.addEventListener(`click`, () => this.backClickHandler());
  }

  backClickHandler() {}
}

export default HeaderView;
