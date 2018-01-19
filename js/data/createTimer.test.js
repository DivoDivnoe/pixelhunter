import assert from 'assert';
import createTimer from '../createTimer';

describe(`#createTimer`, () => {
  it(`returns an object`, () => {
    const time = 30;

    assert.equal(typeof createTimer(time), `object`);
  });

  describe(`#tick`, () => {
    it(`decreases leftTime on 1 second`, () => {
      const time = 30;
      const timer = createTimer(time);

      timer.tick();

      assert.equal(timer.leftTime, 29);
    });
  });

  describe(`leftTime`, () => {
    it(`if there is no time left, timer becomes not active`, () => {
      const time = 1;
      const timer = createTimer(time);

      timer.tick();

      assert(!timer.isActive);
    });
  });
});
