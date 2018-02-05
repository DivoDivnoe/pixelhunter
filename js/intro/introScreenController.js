import IntroScreenView from './introScreenView';
import showScreen from '../showScreen';

class IntroScreenController {
  constructor() {
    this.introScreen = new IntroScreenView();
  }

  init() {
    showScreen(this.introScreen.element);
  }
}

export default IntroScreenController;
