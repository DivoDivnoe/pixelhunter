import abstractView from '../view/abstractView';
import gameStats from '../templates/gameStats';
import * as constants from '../config/config';

class FirstGameScreenView extends abstractView {
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
          <input name="question${index + 1}" type="radio" value=${constants.AnswerType.PHOTO}>
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question${index + 1}" type="radio" value=${constants.AnswerType.PAINTING}>
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

export default FirstGameScreenView;
