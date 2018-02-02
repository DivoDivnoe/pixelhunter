import showScreen from '../showScreen';
import {initialState} from '../model/data';
import header from '../header/header';
import RulesScreenView from './rulesScreenView';
import checkGameStatus from '../checkGameStatus';

const renderRulesScreen = () => {
  const rulesScreen = new RulesScreenView();

  rulesScreen.formSubmitHandler = (name) => checkGameStatus(Object.assign({}, initialState, {name}));

  showScreen(rulesScreen.element, header());
};

export default renderRulesScreen;
