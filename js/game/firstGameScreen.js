import showScreen from '../showScreen';
import checkGameStatus from '../checkGameStatus';
import getNextState from '../getNextState';
import FirstGameScreenView from './firstGameScreenView';
import header from '../header/header';

const renderFirstGameScreen = (state) => {
  const firstGameScreen = new FirstGameScreenView(state);

  firstGameScreen.inputChangeHandler = (answer) => {
    const nextState = getNextState(state, answer);

    return checkGameStatus(nextState);
  };

  showScreen(firstGameScreen.element, header(state));
};

export default renderFirstGameScreen;
