import {sendData} from './api.js';
import {resetMainPin} from './map.js';
import {getKeyByValue, showMessage} from './util.js';
import {TypeNames} from './constants.js';

const Rooms = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  HUNDRED: 100,
};

const Guests = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
};

const AvailableGuests = {
  [Rooms.ONE]: [Guests.ONE],
  [Rooms.TWO]: [Guests.ONE,  Guests.TWO],
  [Rooms.THREE]: [Guests.ONE,  Guests.TWO, Guests.THREE],
  [Rooms.HUNDRED]: [Guests.ZERO],
};

const MinPrices = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const adForm = document.querySelector('.ad-form');
const roomsSelect = adForm.querySelector('#room_number');
const guestsSelect = adForm.querySelector('#capacity');
const guestsOptions = guestsSelect.querySelectorAll('option');
const inputAddress = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const typeSelect = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const disableGuestsOptions = (validGuests) => {
  guestsOptions.forEach((item) => {
    item.disabled = !validGuests.includes(Number(item.value));
  });
};

const validateGuests = () => {
  const validGuests = AvailableGuests[roomsSelect.value];
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

const validatePrice = () => {
  const type = getKeyByValue(TypeNames, typeSelect.value);
  inputPrice.placeholder = MinPrices[type];
  inputPrice.min = MinPrices[type];
};

const timeInSync = () => {
  timeOut.value = timeIn.value;
};

const timeOutSync = () => {
  timeIn.value = timeOut.value;
};

const initEvenentListeners = () => {
  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);
  roomsSelect.addEventListener('change', validateGuests);
  typeSelect.addEventListener('change', validatePrice);
  timeIn.addEventListener('change', timeInSync);
  timeOut.addEventListener('change', timeOutSync);
};

const initForm = () => {
  validateGuests();
  validatePrice();
  timeInSync();
  initEvenentListeners();
};

export {initForm, updateAddress};
