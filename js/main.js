import {createAdMarker} from './map.js';
import './form.js';
import './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {rerenderMarkers} from './filter.js';
import {MAX_AD_MARKERS} from './constants.js';

let ads;

const createMarkers = (data) => {
  ads = data;
  ads
    .slice(0, MAX_AD_MARKERS)
    .forEach(createAdMarker);
};

const onErrorLoad = () => {
  showAlert('Не удалось загрузить данные с сервера');
};

getData(createMarkers, onErrorLoad);

const mapForm = document.querySelector('.map__filters');

mapForm.addEventListener('change', () => {
  rerenderMarkers(ads);
});
