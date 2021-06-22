import {createAds} from './data.js';
import {createCards} from './cards.js';

const ads = createAds();
const cards = createCards(ads);
const cardsList = document.querySelector('#map-canvas');
cardsList.appendChild(cards.firstElementChild);
