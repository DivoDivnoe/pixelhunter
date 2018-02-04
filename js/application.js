import IntroScreenController from './intro/introScreenController';
import GameScreenController from './game/gameScreenController';
import StatsScreenController from './stats/statsScreenController';

const ControllerId = {
  INTRO: ``,
  GAME: `game`,
  STATS: `stats`
};

const getControllerFromHash = (hash) => hash ? hash.slice(1) : ``;

class Application {
  constructor(state) {
    this.state = state;
    this.routes = {
      [ControllerId.INTRO]: IntroScreenController,
      [ControllerId.GAME]: GameScreenController,
      [ControllerId.STATS]: StatsScreenController,
    };

    window.addEventListener(`hashchange`, () => this._hashChangeHandler());
  }

  _hashChangeHandler() {
    const {controllerId, params} = this._deserialize(location.hash);

    switch (controllerId) {
      case ControllerId.GAME: {
        const {name} = params;
        this.state = Object.assign({}, this.state, {name});
        break;
      }
      case ControllerId.STATS: {
        const {result, answers} = params;
        this.state = Object.assign({}, this.state, {result, answers});
        break;
      }
    }

    const controller = new this.routes[controllerId](this);
    controller.init();
  }
  showIntro() {
    location.hash = ControllerId.INTRO;
  }
  showGame(name) {
    const result = {
      controllerId: ControllerId.GAME,
      params: {name}
    };

    location.hash = this._serialize(result);
  }
  showStats(state) {
    const result = {
      controllerId: ControllerId.STATS,
      params:
        {
          result: state.result,
          answers: state.answers
        }
    };

    location.hash = this._serialize(result);
  }
  init() {
    this._hashChangeHandler();
  }
  _serialize(state) {
    const params = state.params;
    const keys = Object.keys(params);

    const resultString = keys.reduce((acc, cur) => {
      const value = params[cur];

      acc.push(`${cur}=${Array.isArray(value) ? value.join(``) : value}`);

      return acc;
    }, []).join(`&`);

    return `${state.controllerId}?${resultString}`;
  }

  _deserialize(hash) {
    const splited = hash.split(`?`);

    const controllerId = getControllerFromHash(splited[0]);
    const query = splited[1];
    let params;
    if (query) {
      params = splited[1].split(`&`).reduce((acc, cur) => {
        const param = cur.split(`=`);
        const key = param[0];
        const value = param[1];

        acc[key] = +value ? value.split(``).map(Number) : value;

        return acc;
      }, {});
    } else {
      params = {};
    }

    return {controllerId, params};
  }
}

export default Application;
