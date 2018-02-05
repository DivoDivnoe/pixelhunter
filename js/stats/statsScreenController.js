import HeaderView from '../header/headerView';
import showScreen from '../showScreen';
import StatsScreenView from './statsScreenView';

class StatsScreenController {
  constructor(application) {
    this.application = application;
    this.model = application.model;
    this.screen = new StatsScreenView(this.model.state);
    this.header = new HeaderView();
  }

  init() {
    this.header.backClickHandler = () => {
      this.model.resetState(this.model.state.questions);
      this.application.showWelcome();
    }
    showScreen(this.screen.element, this.header.element);
  }
}

export default StatsScreenController;
