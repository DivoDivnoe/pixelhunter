var introScreenView = (function () {
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

class IntroScreenView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro intro--hidden">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
      <div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br> Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br> Задача кажется тривиальной,
            но не думай, что все так просто.<br> Фотореализм обманчив и коварен.<br> Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
    `;
  }

  _bind() {
    const greeting = this.element.querySelector(`.greeting`);
    const button = this.element.querySelector(`.greeting__continue`);

    button.addEventListener(`click`, () => {
      this.continueHandler();
      greeting.classList.remove(`greeting--active`);
    });
  }

  showWelcome() {
    const greeting = this.element.querySelector(`.greeting`);

    greeting.classList.remove(`greeting--hidden`);
  }

  hideWelcome() {
    const greeting = this.element.querySelector(`.greeting`);

    greeting.classList.add(`greeting--hidden`);
  }

  show() {
    const intro = this.element.querySelector(`.intro--hidden`);

    intro.classList.remove(`intro--hidden`);
  }

  hide() {
    const intro = this.element.querySelector(`.intro`);

    intro.classList.add(`intro--hidden`);
  }

  continueHandler() {}
}

return IntroScreenView;

}());

//# sourceMappingURL=introScreenView.js.map
