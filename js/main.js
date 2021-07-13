import {createAdMarker} from './map.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

const createMarkers = (ads) => {
  ads.forEach((item) => {
    createAdMarker(item);
  });
};

const onErrorLoad = () => {
  showAlert('Не удалось загрузить данные с сервера');
};

getData(createMarkers, onErrorLoad);
