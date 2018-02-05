import abstractView from '../view/abstractView';
import gameStats from '../templates/gameStats';
import countPoints from '../countPoints';
import * as constants from '../config/config';

class StatsScreenView extends abstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const points = countPoints(this.state);
    const result = this.state.result;

    return `
      <div class="result">
        <h1>${result === constants.Result.WIN ? `Победа!` : `Вы проиграли!`}</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">
              ${gameStats(this.state.answers)}
            </td>
            <td class="result__points">×&nbsp;${constants.POINTS_FOR_RIGHT_ANSWER}</td>
            <td class="result__total">${result === constants.Result.WIN ? points.rightAnswerPoints : `FAIL`}</td>
          </tr>
          ${result === constants.Result.WIN
    ? `
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">${points.speedBonus / constants.BONUS_POINTS_FOR_SPEED}&nbsp;<span class="stats__result stats__result--fast"></span></td>
          <td class="result__points">×&nbsp;${constants.BONUS_POINTS_FOR_SPEED}</td>
          <td class="result__total">${points.speedBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${points.livesBonus / constants.BONUS_POINTS_FOR_LIVE}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${constants.BONUS_POINTS_FOR_LIVE}</td>
          <td class="result__total">${points.livesBonus}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">${points.slowPenalty / constants.PENALTY_FOR_SLOWNESS}&nbsp;<span class="stats__result stats__result--slow"></span></td>
          <td class="result__points">×&nbsp;${constants.PENALTY_FOR_SLOWNESS}</td>
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
