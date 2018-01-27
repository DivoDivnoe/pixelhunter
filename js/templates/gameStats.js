import * as constants from '../constants';

const gameStats = (answers) => `
  <ul class="stats">
    ${answers.map((answer) => {
    if (!answer.answer) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }

    let str = `<li class="stats__result stats__result--correct"></li>`;

    if (answer.time < constants.FAST_ASWER_TIME_UPPER_LIMIT) {
      str = `<li class="stats__result stats__result--fast"></li>`;
    } else if (answer.time >= constants.SLOW_ANSWER_TIME_BOTTOM_LIMIT) {
      str = `<li class="stats__result stats__result--slow"></li>`;
    }

    return str;
  }).join(``)}
    ${new Array(constants.NUM_OF_QUESTIONS - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

export default gameStats;
