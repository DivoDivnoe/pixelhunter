export const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = document.createElement(`img`);

    img.src = url;
    img.addEventListener(`load`, (evt) => resolve(evt.target.response));
    img.onerror = (evt) => resolve(evt.target.response);

    setTimeout(resolve, 10000);
  });
};

export default loadImage;
