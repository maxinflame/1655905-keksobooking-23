import {createAds} from './data.js';
import {createCard} from './cards.js';
import './form.js';

const ads = createAds();
const card = createCard(ads[0]);
const cardsList = document.querySelector('#map-canvas');
cardsList.appendChild(card);
