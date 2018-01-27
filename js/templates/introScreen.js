import getElementFromTemplate from '../getElement';
import renderGreetingsScreen from './greetingsScreen';
import showScreen from '../showScreen';

const introTemplate = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>
`;

const renderIntroScreen = () => {
  const introScreen = getElementFromTemplate(introTemplate);
  const asterix = introScreen.querySelector(`.intro__asterisk`);

  asterix.addEventListener(`click`, renderGreetingsScreen);

  showScreen(introScreen);
};

export default renderIntroScreen;
