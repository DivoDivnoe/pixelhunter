import abstractView from '../view/abstractView';
import gameStats from '../templates/gameStats';

class ThirdGameScreenView extends abstractView {
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

export default ThirdGameScreenView;
