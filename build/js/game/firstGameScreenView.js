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

const resize = (frame, given) => {
  if (!given) {
    return frame;
  }

  const ratio = given.width / given.height;
  const outOffsetWidth = given.width - frame.width;
  const outOffsetHeight = given.height - frame.height;
  const result = {};

  if (outOffsetWidth >= outOffsetHeight) {
    result.width = frame.width;
    result.height = Math.round(result.width / ratio);
  } else {
    result.height = frame.height;
    result.width = Math.round(result.height * ratio);
  }

  return result;
};

class FirstGameScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get frame() {
    return {
      width: 468,
      height: 458
    };
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];

    const question = (item, index) => {
      const imageData = this.state.imagesData.find((image) => image.url === item.image.url);
      const width = imageData.width;
      const height = imageData.height;
      const dimensions = resize(this.frame, {width, height});

      return `
        <div class="game__option">
          <img src=${item.image.url} alt="Option ${index}" width=${dimensions.width} height=${dimensions.height}>
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
    };

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