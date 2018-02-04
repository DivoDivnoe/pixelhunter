import * as constants from '../config/config';

const router = {
  [constants.Answer.SLOW]: `<li class="stats__result stats__result--slow"></li>`,
  [constants.Answer.NORMAL]: `<li class="stats__result stats__result--correct"></li>`,
  [constants.Answer.FAST]: `<li class="stats__result stats__result--fast"></li>`,
  [constants.Answer.FAIL]: `<li class="stats__result stats__result--wrong"></li>`
};

const gameStats = (answers) => `
  <ul class="stats">
    ${answers.map((answer) => router[answer]).join(``)}
    ${new Array(constants.NUM_OF_QUESTIONS - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>
`;

export default gameStats;
