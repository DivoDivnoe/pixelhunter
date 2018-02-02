import abstractView from '../view/abstractView';
import gameStats from '../templates/gameStats';

class FirstGameScreenView extends abstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];

    const question = (item, index) => `
      <div class="game__option">
        <img src=${item.img} alt="Option ${index}" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question${index + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    `;

    return `
      <div class="game">
        <p class="game__task">${game.title}</p>
        <form class="game__content">
          ${game.items.map(question).join(``)}
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
      const answer = value1 === game.items[0][`answer`] && value2 === game.items[1][`answer`];

      this.inputChangeHandler(answer);

      return answer;
    }));
  }

  inputChangeHandler() {}
}

export default FirstGameScreenView;
