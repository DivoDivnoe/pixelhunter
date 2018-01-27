import renderFirstGameScreen from './firstGameScreen';
import renderSecondGameScreen from './secondGameScreen';
import renderThirdGameScreen from './thirdGameScreen';

const router = {
  game1: renderFirstGameScreen,
  game2: renderSecondGameScreen,
  game3: renderThirdGameScreen
};

export default router;
