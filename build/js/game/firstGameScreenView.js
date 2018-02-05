var firstGameScreenView = (function () {
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
const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
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

class FirstGameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];

    const question = (item, index) => `
      <div class="game__option">
        <img src=${item.image.url} alt="Option ${index}" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question${index + 1}" type="radio" value=${AnswerType.PHOTO}>
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question${index + 1}" type="radio" value=${AnswerType.PAINTING}>
          <span>Рисунок</span>
        </label>
      </div>
    `;

    return `
      <div class="game">
        <p class="game__task">${game.question}</p>
        <form class="game__content">
          ${game.answers.map(question).join(``)}
        </form>
        <div class="stats">${gameStats(this.state.answers).trim()}</div>
      </div>
    `;
  }

  _bind() {
    const form = this.element.querySelector(`.game__content`);
    const inputs = form.querySelectorAll(`input[type="radio"]`);

    [...inputs].forEach((input) => input.addEventListener(`change`, () => {
      const value1 = form.question1.value;
      const value2 = form.question2.value;

      if (!(value1 && value2)) {
        return false;
      }

      const game = this.state.questions[this.state.questionNumber];
      const answer = value1 === game.answers[0][`type`] && value2 === game.answers[1][`type`];

      this.answerHandler(answer);

      return answer;
    }));
  }

  answerHandler() {}
}

return FirstGameScreenView;

}());

//# sourceMappingURL=firstGameScreenView.js.map
