import {createAds} from './data.js';
import {createMarker} from './map.js';
import './form.js';
import './map.js';

const ads = createAds();
ads.forEach((item) => createMarker(item));

