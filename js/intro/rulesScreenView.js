import abstractView from '../view/abstractView';

class RulesScreenView extends abstractView {
  constructor() {
    super();
  }

  get template() {
    return `
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
  }

  _bind() {
    const form = this.element.querySelector(`.rules__form`);
    const input = form.querySelector(`.rules__input`);
    const button = form.querySelector(`.rules__button`);

    input.addEventListener(`input`, (evt) => {
      button.disabled = evt.target.value ? false : true;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();

      this.formSubmitHandler(input.value);
    });
  }

  formSubmitHandler() {}
}

export default RulesScreenView;
