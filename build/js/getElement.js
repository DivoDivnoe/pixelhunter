var getElement = (function () {
'use strict';

const getElementFromTemplate = (template) => {
  const div = document.createElement(`div`);

  div.innerHTML = template;

  return div.children.length > 1 ? div : div.firstElementChild;
};

return getElementFromTemplate;

}());

//# sourceMappingURL=getElement.js.map
