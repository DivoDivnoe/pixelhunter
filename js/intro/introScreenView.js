import abstractView from '../view/abstractView';

class IntroScreenView extends abstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
    `;
  }

  _bind() {
    const asterix = this.element.querySelector(`.intro__asterisk`);

    asterix.addEventListener(`click`, () => this.beginGameHandler());
  }

  beginGameHandler() {}
}

export default IntroScreenView;
