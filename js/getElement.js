const getElementFromTemplate = (template) => {
  const div = document.createElement(`div`);

  div.innerHTML = template;

  return div.children.length > 1 ? div : div.firstElementChild;
};

export default getElementFromTemplate;
