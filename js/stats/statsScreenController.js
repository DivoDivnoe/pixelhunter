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
    const stats = this.model.state.answers;
    const lives = this.model.state.lives;

    this.model.save({stats, lives})
        .then(() => this.model.loadStatistics())
        .then(() => showScreen(this.screen.element, this.header.element));
    this.header.backClickHandler = () => {
      this.model.resetState(this.model.state.questions);
      this.application.showWelcome();
    };
  }
}

export default StatsScreenController;
