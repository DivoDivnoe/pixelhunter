import showScreen from '../showScreen';
import checkGameStatus from '../checkGameStatus';
import header from '../header/header';
import getNextState from '../getNextState';
import ThirdGameScreenView from './thirdGameScreenView';

const renderThirdGameScreen = (state) => {
  const thirdGameScreen = new ThirdGameScreenView(state);

  thirdGameScreen.imageClickHandler = (answer) => {
    const nextState = getNextState(state, answer);

    return checkGameStatus(nextState);
  };

  showScreen(thirdGameScreen.element, header(state));
};

export default renderThirdGameScreen;
