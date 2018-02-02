import abstractView from '../view/abstractView';
import gameStats from '../templates/gameStats';

class StatsScreenView extends abstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const points = this.state.points;

    return `
      <div class="result">
        <h1>${this.state.result === `win` ? `Победа!` : `Вы проиграли!`}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${gameStats(this.state.answers)}
            </td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">${this.state.result === `win` ? points.rightAnswerPoints : `FAIL`}</td>
          </tr>
          ${this.state.result === `win`
    ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${points.speedBonus / 50}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${points.speedBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${points.livesBonus / 50}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${points.livesBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${points.slowPenalty / 50}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${points.slowPenalty}</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">${points.total}</td>
        </tr>
      `
    : ``}
        </table>
      </div>
    `;
  }
}

export default StatsScreenView;
