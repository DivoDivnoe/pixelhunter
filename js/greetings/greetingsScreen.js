import renderRulesScreen from '../rules/rulesScreen';
import showScreen from '../showScreen';
import GreetingsScreenView from '../greetings/greetingsScreenView';

const renderGreetingsScreen = () => {
  const greetingsScreen = new GreetingsScreenView();

  greetingsScreen.buttonClickHandler = () => renderRulesScreen();

  showScreen(greetingsScreen.element);
};

export default renderGreetingsScreen;
