import abstractView from '../view/abstractView';
import gameStats from '../templates/gameStats';
import * as constants from '../config/config';
import resize from '../resize/resize';

class SecondGameScreenView extends abstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get frame() {
    return {
      width: 705,
      height: 455
    };
  }

  get template() {
    const game = this.state.questions[this.state.questionNumber];
    const imageData = this.state.imagesData.find((image) => image.url === game.answers[0].image.url);
    const width = imageData.width;
    const height = imageData.height;
    const dimensions = resize(this.frame, {width, height});

    return `
      <div class="game">
        <p class="game__task">${game.question}</p>
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src=${game.answers[0].image.url} alt="Option 1" width=${dimensions.width} height=${dimensions.height}>
            <label class="game__answer  game__answer--photo">
              <input name="question1" type="radio" value=${constants.AnswerType.PHOTO}>
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--wide  game__answer--paint">
              <input name="question1" type="radio" value=${constants.AnswerType.PAINTING}>
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        <div class="stats">${gameStats(this.state.answers)}</div>
      </div>
    `;
  }

  _bind() {
    const form = this.element.querySelector(`.game__content--wide`);
    const answers = form.querySelectorAll(`input[name="question1"]`);
    const game = this.state.questions[this.state.questionNumber];

    [...answers].forEach((item) => item.addEventListener(`change`, () => {
      const answer = form.question1.value === game.answers[0].type;

      this.answerHandler(answer);
    }));
  }

  answerHandler() {}
}

export default SecondGameScreenView;
