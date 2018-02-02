import showScreen from '../showScreen';
import header from '../header/header';
import StatsScreenView from './statsScreenView';

const renderStatsScreen = (state) => {
  const statsScreen = new StatsScreenView(state);

  showScreen(statsScreen.element, header(state));
};

export default renderStatsScreen;
