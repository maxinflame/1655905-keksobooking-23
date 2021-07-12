import {sendData} from './api.js';
import { CenterCoordinates } from './constants.js';
import {resetMainPin} from './map.js';
import {showMessage} from './util.js';

const adForm = document.querySelector('.ad-form');
const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsOptions = guestsSelect.querySelectorAll('option');
const inputAddress = document.querySelector('#address');

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


validateGuests();
roomsSelect.addEventListener('change', validateGuests);

const updateAddress = (coordinates) => {
  inputAddress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const resetForm = () => {
  adForm.reset();
  resetMainPin();
  updateAddress(CenterCoordinates);
  validateGuests();
};

const onSuccessSendForm = () => {
  resetForm();
  showMessage('success');
};

const onErrorSendForm = () => {
  showMessage('');
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  sendData(formData, onSuccessSendForm, onErrorSendForm);
});


const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {updateAddress};
