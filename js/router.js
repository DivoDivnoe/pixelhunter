import renderFirstGameScreen from './game/firstGameScreen';
import renderSecondGameScreen from './game/secondGameScreen';
import renderThirdGameScreen from './game/thirdGameScreen';

const router = {
  game1: renderFirstGameScreen,
  game2: renderSecondGameScreen,
  game3: renderThirdGameScreen
};

export default router;
