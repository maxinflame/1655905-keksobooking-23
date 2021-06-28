import {createAds} from './data.js';
import {createCards} from './cards.js';

const cardsListFragment = document.createDocumentFragment();
const ads = createAds();
const cards = createCards(ads, cardsListFragment);
const cardsList = document.querySelector('#map-canvas');
cardsList.appendChild(cards.firstElementChild);
