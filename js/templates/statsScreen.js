import getElementFromTemplate from '../getElement';
import showScreen from '../showScreen';
import header from './header';
import gameStats from './gameStats';
import countPoints from '../countPoints';

const statsTemplate = (state) => {
  const points = countPoints(state);
  console.log(points, state);

  return `
    <div class="result">
      <h1>${state.result === `win` ? `Победа!` : `Вы проиграли!`}</h1>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${gameStats(state.answers)}
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${state.result === `win` ? points.rightAnswerPoints : `FAIL`}</td>
        </tr>
        ${state.result === `win` ?
    `<tr>
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
    </tr>` : ``}
      </table>
    </div>
  `;
};

const renderStatsScreen = (state) => {
  const statsScreen = getElementFromTemplate(statsTemplate(state));

  showScreen(statsScreen, header());
};

export default renderStatsScreen;
