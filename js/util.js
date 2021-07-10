const getRandomFloatNumber = (from, to, accuracy) => {
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
};

const getRandomIntegerNumber = (from, to) => getRandomFloatNumber(from, to, 0);

const getRandomArrayElement = function (array) {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

const getFewRandomArrayElements = function (array) {
  const quantity = getRandomIntegerNumber(1, array.length);
  const elements = [];
  const usedElements = [];
  for (let i = 0; i < quantity; i++) {
    const element = getRandomArrayElement(array);
    if (!usedElements.includes(element)) {
      elements.push(element);
      usedElements.push(element);
    } else {
      i -= 1;
    }
  } return elements;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};


const showMessage = (templateName) => {
  const messageTemplate = document.querySelector(`#${templateName}`)
    .content
    .querySelector(`.${templateName}`);
  const message = messageTemplate.cloneNode(true);
  document.body.append(message);
  document.addEventListener('click', () => {
    message.remove();
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      message.remove();
    }
  });
};

const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapSelects = mapFiltersForm.querySelectorAll('select');
const mapFieldset = mapFiltersForm.querySelector('fieldset');

const changeDisabledElements =  (array, disabled) => {
  array.forEach((item) => {
    item.disabled = disabled;
  });
};

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  changeDisabledElements(adFormFieldsets, true);
  mapFiltersForm.classList.add('map__filters--disabled');
  changeDisabledElements(mapSelects, true);
  mapFieldset.disabled = true;
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  changeDisabledElements(adFormFieldsets, false);
  mapFiltersForm.classList.remove('map__filters--disabled');
  changeDisabledElements(mapSelects, false);
  mapFieldset.disabled = false;
};

export {getRandomFloatNumber, getRandomIntegerNumber, getRandomArrayElement, getFewRandomArrayElements, showAlert, showMessage, deactivatePage, activatePage};
