import getElementFromTemplate from '../getElement';
import showScreen from '../showScreen';
import router from './router';
import {initialState} from '../model/data';
import header from './header';

const rulesTemplate = `
  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img src="img/photo_icon.png" width="16" height="16"> или рисунок <img src="img/paint_icon.png"
        width="16" height="16" alt="">.<br> Фотографиями или рисунками могут быть оба изображения.<br> На каждую попытку
      отводится 30 секунд.<br> Ошибиться можно не более 3 раз.<br>
      <br> Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
`;

const renderRulesScreen = () => {
  const rulesScreen = getElementFromTemplate(rulesTemplate);
  const form = rulesScreen.querySelector(`.rules__form`);
  const input = form.querySelector(`.rules__input`);
  const button = form.querySelector(`.rules__button`);

  input.addEventListener(`input`, (evt) => {
    button.disabled = evt.target.value ? false : true;
  });

  const initGame = (state) => router[state.questions[state.questionNumber].type](state);

  form.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    initGame(Object.assign({}, initialState, {name: input.value}));
  });

  showScreen(rulesScreen, header());
};

export default renderRulesScreen;
