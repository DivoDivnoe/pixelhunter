import assert from 'assert';
import countPoints from '../countPoints';

describe(`#countPoints`, () => {
  it(`if no lives left, returns -1`, () => {
    const answers = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    const lives = 0;

    assert.equal(countPoints(answers, lives), -1);
  });

  it(`if it is less then 10 answers, returns -1`, () => {
    const answers = [{}, {}, {}, {}, {}, {}, {}, {}];
    const lives = 3;

    assert.equal(countPoints(answers, lives), -1);
  });

  it(`if 3 answers are wrong, returns -1`, () => {
    const answers = [
      {
        answer: false,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: false,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: false,
        time: 15
      }
    ];
    const lives = 3;

    assert.equal(countPoints(answers, lives), -1);
  });

  it(`if all answers are given in between 10 and 20 seconds and are right, returns 1150`, () => {
    const answers = [
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      },
      {
        answer: true,
        time: 15
      }
    ];
    const lives = 3;

    assert.equal(countPoints(answers, lives), 1150);
  });

  it(`if 1 live left and all asnwers are quick, returns 1550`, () => {
    const answers = [
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: false,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: false,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      },
      {
        answer: true,
        time: 9
      }
    ];
    const lives = 1;

    assert.equal(countPoints(answers, lives), 1550);
  });
});
