import {initMap} from './map.js';
import {initForm} from './form.js';
import {getData} from './api.js';
import {activatePage, deactivatePage, showAlert} from './util.js';
import {initFilter} from './filter.js';

const onSuccessLoad = (items) => {
  initFilter(items);
};

const onErrorLoad = () => {
  showAlert('Не удалось загрузить данные с сервера');
};

const onMapLoaded = () => {
  activatePage();
  getData(onSuccessLoad, onErrorLoad);
  initForm();
};

deactivatePage();
initMap(onMapLoaded);
