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
      const stats = this.model.state.answers;
      const lives = this.model.state.lives;

      this.model.save({stats, lives})
          .then(() => this.model.resetState(this.model.state.questions))
          .then(() => this.model.loadStatistics())
          .then(() => this.application.showWelcome());
    };
    showScreen(this.screen.element, this.header.element);
  }
}

export default StatsScreenController;
