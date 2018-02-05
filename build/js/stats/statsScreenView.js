var statsScreenView = (function () {
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

const POINTS_FOR_RIGHT_ANSWER = 100;
const BONUS_POINTS_FOR_SPEED = 50;
const BONUS_POINTS_FOR_LIVE = 50;
const PENALTY_FOR_SLOWNESS = 50;
const NUM_OF_QUESTIONS = 10;
const Answer = {
  FAIL: `fail`,
  SLOW: `slow`,
  NORMAL: `right`,
  FAST: `fast`
};
const Result = {
  LOSS: `loss`,
  WIN: `win`
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

const countPoints = (answers, lives) => {
  const result = {
    total: 0,
    rightAnswerPoints: 0,
    speedBonus: 0,
    livesBonus: 0,
    slowPenalty: 0
  };

  for (const answer of answers) {
    if (!answer) {
      continue;
    }

    result.rightAnswerPoints += POINTS_FOR_RIGHT_ANSWER;

    switch (answer) {
      case Answer.FAST: {
        result.speedBonus += BONUS_POINTS_FOR_SPEED;
        break;
      }
      case Answer.SLOW: {
        result.slowPenalty += PENALTY_FOR_SLOWNESS;
      }
    }
  }

  result.livesBonus = lives * BONUS_POINTS_FOR_LIVE;
  result.total = result.rightAnswerPoints + result.speedBonus + result.livesBonus - result.slowPenalty;

  return result;
};

class StatsScreenView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const points = countPoints(this.state.answers, this.state.lives);

    const resultTable = (results, index) => {
      const result = results.lives ? countPoints(results.stats, results.lives).total : `FAIL`;

      return `
        <table class="result__table">
          <tr>
            <td class="result__number">${index + 2}.</td>
            <td colspan="2">
              ${gameStats(results.stats)}
            </td>
            <td class="result__total--final">${result}</td>
          </tr>
        </table>
      `;
    };

    return `
      <div class="result">
        <h1>${this.state.result === Result.WIN ? `Победа!` : `Вы проиграли!`}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${gameStats(this.state.answers)}
            </td>
            <td class="result__points">×&nbsp;${POINTS_FOR_RIGHT_ANSWER}</td>
            <td class="result__total">${this.state.result === Result.WIN ? points.rightAnswerPoints : `FAIL`}</td>
          </tr>
          ${this.state.result === Result.WIN
    ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${points.speedBonus / BONUS_POINTS_FOR_SPEED}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${BONUS_POINTS_FOR_SPEED}</td>
          <td class="result__total">${points.speedBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${points.livesBonus / BONUS_POINTS_FOR_LIVE}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${BONUS_POINTS_FOR_LIVE}</td>
          <td class="result__total">${points.livesBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${points.slowPenalty / PENALTY_FOR_SLOWNESS}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${PENALTY_FOR_SLOWNESS}</td>
          <td class="result__total">${points.slowPenalty}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${points.total}</td>
        </tr>
      `
    : ``}
        </table>
      </div>
      ${this.state.stats ? this.state.stats.slice(0, -1).map(resultTable).join(``) : ``}
    `;
  }
}

return StatsScreenView;

}());

//# sourceMappingURL=statsScreenView.js.map
