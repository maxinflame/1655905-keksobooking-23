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

export {showAlert, showMessage, deactivatePage, activatePage};
