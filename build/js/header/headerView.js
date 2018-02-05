var headerView = (function () {
'use strict';

const getElementFromTemplate = (template) => {
  const div = document.createElement(`div`);

  div.innerHTML = template;

  return div.children.length > 1 ? div : div.firstElementChild;
};

class AbstractView {
  get template() {
    throw new Error(`You have to define template`);
  }

  get frame() {
    throw new Error(`You have to define frame dimensions`);
  }

  _render() {
    return getElementFromTemplate(this.template.trim());
  }

  _bind() {}

  get element() {
    if (!this._element) {
      this._element = this._render();
      this._bind();
    }

    return this._element;
  }
}

class HeaderView extends AbstractView {
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

  get element() {
    if (!this._element) {
      this._element = this._render();
      this._bind();
      this._startTimer();
    }

    return this._element;
  }

  _bind() {
    const back = this.element.querySelector(`.back`);


    back.addEventListener(`click`, () => this.backClickHandler());
  }

  _startTimer() {
    const gameTimer = this.element.querySelector(`.game__timer`);

    if (!gameTimer) {
      return false;
    }
    const timer = {
      leftTime: this.state.time,
      isActive: true,
      tick() {
        this.leftTime--;
        if (!this.leftTime) {
          this.isActive = false;
        }
      }
    };
    this.timer = setInterval(() => {
      if (!timer.isActive) {
        this.stopTimer();
        this.finishTimeHandler(false);
      } else {
        timer.tick();
        this.changeTimeHandler(timer.leftTime);
        gameTimer.textContent = timer.leftTime;
      }
    }, 1000);

    return this.timer;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  backClickHandler() {}

  finishTimeHandler() {}

  changeTimeHandler() {}
}

return HeaderView;

}());

//# sourceMappingURL=headerView.js.map
