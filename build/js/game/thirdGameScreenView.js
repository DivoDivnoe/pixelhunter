var thirdGameScreenView = (function () {
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

const NUM_OF_QUESTIONS = 10;
const Answer = {
  FAIL: `fail`,
  SLOW: `slow`,
  NORMAL: `right`,
  FAST: `fast`
};

const router = {
  [Answer.SLOW]: `<li class="stats__result stats__result--slow"></li>`,
  [Answer.NORMAL]: `<li class="stats__result stats__result--correct"></li>`,
  [Answer.FAST]: `<li class="stats__result stats__result--fast"></li>`,
  [Answer.FAIL]: `<li class="stats__result stats__result--wrong"></li>`
};

const gameStats = (answers) => `
  <ul class="stats">
    ${answers.map((answer) => router[answer]).join(``)}
    ${new Array(NUM_OF_QUESTIONS - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

class ThirdGameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];
    const question = (item, index) => `
      <div class="game__option">
        <img src=${item.image.url} alt="Option ${index + 1}" width="304" height="455">
      </div>
    `;

    return `
      <div class="game">
        <p class="game__task">${game.question}</p>
        <form class="game__content  game__content--triple">
          ${game.answers.map(question).join(``)}
        </form>
        <div class="stats">${gameStats(this.state.answers)}</div>
      </div>
    `;
  }

  _bind() {
    const options = this.element.querySelectorAll(`.game__option`);
    const game = this.state.questions[this.state.questionNumber];

    [...options].forEach((option) => option.addEventListener(`click`, (evt) => {
      const target = evt.target;
      const answers = game.answers;
      let type = answers[0].type;

      for (let i = 1; i < answers.length; i++) {
        if (answers[i].type === type) {
          type = answers.find((item) => item.type !== type).type;
          break;
        }
      }

      const answer = [...options].indexOf(target) === game.answers.findIndex((item) => item.type === type);

      this.answerHandler(answer);
    }));
  }

  answerHandler() {}
}

return ThirdGameScreenView;

}());

//# sourceMappingURL=thirdGameScreenView.js.map
