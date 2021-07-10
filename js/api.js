import {showAlert, showMessage} from './util.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();}
      else {
        showAlert('Не удалось загрузить данные с сервера');
      }
    })
    .then((ads) =>{
      onSuccess(ads);
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные с сервера');
    });
};

const sendData = (body, reset) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  ).then((response) => {
    if (response.ok) {
      reset();
      showMessage('success');
    } else {
      showMessage('error');
    }
  }).catch(() => {
    showMessage('error');
  });
};

export {getData, sendData};
