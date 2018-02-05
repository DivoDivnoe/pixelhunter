var gameStats = (function () {
'use strict';

const NUM_OF_QUESTIONS = 10;
const Answer = {
  FAIL: `fail`,
  SLOW: `slow`,
  NORMAL: `right`,
  FAST: `fast`
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

return gameStats;

}());

//# sourceMappingURL=gameStats.js.map
