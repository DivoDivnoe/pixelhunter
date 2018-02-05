var loadImage = (function (exports) {
'use strict';

const loadImage = (url) => {
  return new Promise((resolve) => {
    const img = document.createElement(`img`);

    img.src = url;
    img.addEventListener(`load`, (evt) => resolve(evt.target.response));
    img.onerror = (evt) => resolve(evt.target.response);

    setTimeout(resolve, 10000);
  });
};

exports.loadImage = loadImage;
exports['default'] = loadImage;

return exports;

}({}));

//# sourceMappingURL=loadImage.js.map
