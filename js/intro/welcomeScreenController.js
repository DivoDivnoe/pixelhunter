import GreetingsScreenView from './greetingsScreenView';
import RulesScreenView from './rulesScreenView';
import HeaderView from '../header/headerView';
import showScreen from '../showScreen';

class IntroScreenController {
  constructor(application) {
    this.application = application;
    this.header = new HeaderView();
    this.greetingsScreen = new GreetingsScreenView();
    this.rulesScreen = new RulesScreenView();
  }

  init() {
    this.greetingsScreen.continueHandler = () => this.renderRulesScreen();

    showScreen(this.greetingsScreen.element);
  }

  renderRulesScreen() {
    this.header.backClickHandler = () => this.application.showIntro();
    this.rulesScreen.formSubmitHandler = (name) => this.application.showGame(name);

    showScreen(this.rulesScreen.element, this.header.element);
  }
}

export default IntroScreenController;