const getElementFromTemplate = template => {
  const div = document.createElement('div');

  div.innerHTML = template;

  return div;
};

export default getElementFromTemplate;
