const ESCAPE_CODES = ['Escape', 'Esc'];

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

const removeMessage = () => {
  const message = document.querySelector('.form-message');
  message.remove();
};

const onPopupEscKeydown = (evt) => {
  if (evt.key === ESCAPE_CODES[0] || evt.key === ESCAPE_CODES[1]) {
    evt.preventDefault();
    removeMessage();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const removeMessageByClick = () => {
  removeMessage();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const showMessage = (templateName) => {
  const messageTemplate = document.querySelector(`#${templateName}`)
    .content
    .querySelector(`.${templateName}`);
  const message = messageTemplate.cloneNode(true);
  message.classList.add('form-message');
  document.body.append(message);
  message.addEventListener('click', removeMessageByClick);
  document.addEventListener('keydown', onPopupEscKeydown);
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

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const getKeyByValue = (object, value) => {
  const key = Object.keys(object).find((name) => object[name] === value);
  return key;
};


export {showAlert, showMessage, deactivatePage, activatePage, debounce, getKeyByValue};
