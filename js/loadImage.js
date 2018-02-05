export const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = document.createElement(`img`);

    img.src = url;
    img.addEventListener(`load`, () => {
      const width = img.width;
      const height = img.height;

      resolve({url, width, height});
    });
    img.onerror = (evt) => resolve(evt.target.response);

    setTimeout(resolve, 10000);
  });
};

export default loadImage;
