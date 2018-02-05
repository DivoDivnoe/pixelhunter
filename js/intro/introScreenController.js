import IntroScreenView from './introScreenView';
import showScreen from '../showScreen';
import RulesScreenView from './rulesScreenView';
import HeaderView from '../header/headerView';

class IntroScreenController {
  constructor(application) {
    this.application = application;
    this.header = new HeaderView();
    this.rulesScreen = new RulesScreenView();
    this.introScreen = new IntroScreenView();
  }

  init() {
    this.introScreen.continueHandler = () => this.renderRulesScreen();

    showScreen(this.introScreen.element);
  }

  showPreloader() {
    this.introScreen.show();
  }

  hidePreloader() {
    this.introScreen.hide();
  }

  hideGreetingsScreen() {
    this.introScreen.hideWelcome();
  }

  showGreetingsScreen() {
    this.introScreen.showWelcome();
  }

  renderRulesScreen() {
    this.header.backClickHandler = () => this.application.showIntro();
    this.rulesScreen.formSubmitHandler = (name) => this.application.showGame(name);

    showScreen(this.rulesScreen.element, this.header.element);
  }
}

export default IntroScreenController;
