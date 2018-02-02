import HeaderView from './headerView';
import renderIntroScreen from '../intro/introScreen';

const header = (state) => {
  const headerItem = state ? new HeaderView(state) : new HeaderView();
  headerItem.backClickHandler = () => renderIntroScreen();

  return headerItem.element;
};

export default header;
