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
    item.disabled = true;
  });

  validGuests.forEach((item) => {
    guestsSelect.querySelector(`option[value="${item}"]`).disabled = false;
  });
};

const validateGuests = () => {
  const validGuests = AVAILABLE_GUESTS[roomsSelect.value];
  const [defaultGuestValue] = validGuests;
  disableGuestsOptions(validGuests);
  guestsSelect.value = defaultGuestValue;
};

roomsSelect.addEventListener('change', validateGuests);
