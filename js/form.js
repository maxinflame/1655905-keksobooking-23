const roomsSelect = document.querySelector('#room_number');
const guestsSelect = document.querySelector('#capacity');
const guestsOptions = guestsSelect.querySelectorAll('option');

const disableGuestsOptions = (roomsQuantity) => {
  guestsOptions.forEach((item) => {
    item.disabled = true;
  });

  for(let i = 0; i <= roomsQuantity; i++) {
    guestsSelect.querySelector(`option[value="${i}"]`).disabled = false;
  }
};

const validateGuests = () => {
  if (roomsSelect.value === '100') {
    disableGuestsOptions(0);
    guestsSelect.value = 0;
  }
  else {
    disableGuestsOptions(roomsSelect.value);
  }

  if (guestsSelect.value > roomsSelect.value || (guestsSelect.value === '0' && roomsSelect.value !== '100')) {
    if (guestsSelect.value === '0') {
      guestsSelect.value = 3;
    }
    while (guestsSelect.value > roomsSelect.value) {
      guestsSelect.value -= 1;
    }
  }
};

roomsSelect.addEventListener('change', validateGuests);
