import {createAdMarker} from './map.js';
import './form.js';
import './map.js';
import {getData} from './api.js';

const createMarkers = (ads) => {
  ads.forEach((item) => {
    createAdMarker(item);
  });
};

getData(createMarkers);
