import {sendData} from './api.js';
import {resetMainPin} from './map.js';
import {showMessage} from './util.js';

const ROOMS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
};

const GUESTS = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const AVAILABLE_GUESTS = {
  [ROOMS.ONE]: [GUESTS.ONE],
  [ROOMS.TWO]: [GUESTS.ONE,  GUESTS.TWO],
  [ROOMS.THREE]: [GUESTS.ONE,  GUESTS.TWO, GUESTS.THREE],
  [ROOMS.HUNDRED]: [GUESTS.ZERO],
};

const adForm = document.querySelector('.ad-form');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsOptions = guestsSelect.querySelectorAll('option');
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const disableGuestsOptions = (validGuests) => {
  guestsOptions.forEach((item) => {
    item.disabled = !validGuests.includes(Number(item.value));
  });
};

const validateGuests = () => {
  const validGuests = AVAILABLE_GUESTS[roomsSelect.value];
  const [defaultGuestValue] = validGuests;
  disableGuestsOptions(validGuests);
  guestsSelect.value = defaultGuestValue;
};

const updateAddress = (coordinates) => {
  inputAddress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const resetForm = () => {
  adForm.reset();
  resetMainPin();
  validateGuests();
};

const onSuccessSendForm = () => {
  resetForm();
  showMessage('success');
};

const onErrorSendForm = () => {
  showMessage('error');
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  sendData(formData, onSuccessSendForm, onErrorSendForm);
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

const initEvenentListeners = () => {
  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
  roomsSelect.addEventListener('change', validateGuests);
};

const initForm = () => {
  validateGuests();
  initEvenentListeners();
};

export {initForm, updateAddress};
