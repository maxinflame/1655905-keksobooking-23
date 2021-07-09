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

const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsOptions = guestsSelect.querySelectorAll('option');

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

deactivatePage();
validateGuests();
roomsSelect.addEventListener('change', validateGuests);

export {activatePage, deactivatePage};
