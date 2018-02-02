import showScreen from '../showScreen';
import checkGameStatus from '../checkGameStatus';
import header from '../header/header';
import getNextState from '../getNextState';
import SecondGameScreenView from './secondGameScreenView';

const renderSecondGameScreen = (state) => {
  const secondGameScreen = new SecondGameScreenView(state);

  secondGameScreen.inputChangeHandler = (answer) => {
    const nextState = getNextState(state, answer);

    return checkGameStatus(nextState);
  };

  showScreen(secondGameScreen.element, header(state));
};

export default renderSecondGameScreen;
