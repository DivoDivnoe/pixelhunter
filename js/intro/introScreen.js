import showScreen from '../showScreen';
import IntroScreenView from './introScreenView';
import renderGreetingsScreen from '../greetings/greetingsScreen';

const renderIntroScreen = () => {
  const introScreen = new IntroScreenView();

  introScreen.asterixClickHandler = () => renderGreetingsScreen();

  showScreen(introScreen.element);
};

export default renderIntroScreen;
