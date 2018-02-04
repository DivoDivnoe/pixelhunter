import HeaderView from '../header/headerView';
import showScreen from '../showScreen';
import StatsScreenView from './statsScreenView';

class StatsScreenController {
  constructor(application) {
    this.application = application;
    this.state = application.state;
    this.screen = new StatsScreenView(this.state);
    this.header = new HeaderView();
  }

  init() {
    this.header.backClickHandler = () => this.application.showIntro();
    showScreen(this.screen.element, this.header.element);
  }
}

export default StatsScreenController;
