import {getRandomFloatNumber, getRandomIntegerNumber, getRandomArrayElement, getFewRandomArrayElements} from './util.js';
import {TYPES, TIMES, FEATURES, DESCRIPTIONS, PHOTOS, MIN_PRICE, MAX_PRICE, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG, COORDINATION_ACCURACY} from './constants.js';

let avatarId = 0;

const createOffer = (lat, lng) => {
  const offer = {
    title: 'Сдам жилплощадь',
    address: `${lat}, ${lng}`,
    price: getRandomIntegerNumber(MAX_PRICE, MIN_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomIntegerNumber(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomIntegerNumber(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomArrayElement(TIMES),
    checkout: getRandomArrayElement(TIMES),
    features: getFewRandomArrayElements(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getFewRandomArrayElements(PHOTOS),
  };
  return offer;
};

const createAd = () => {
  avatarId += 1;
  const lat = getRandomFloatNumber(MIN_LAT, MAX_LAT, COORDINATION_ACCURACY);
  const lng = getRandomFloatNumber(MIN_LNG, MAX_LNG, COORDINATION_ACCURACY);
  const ad = {
    author: {
      avatar: `img/avatars/user0${avatarId}.png`,
    },
    offer: createOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
};

const createAds = function () {
  return new Array(10).fill(null).map(() => createAd());
};

export {createAds};
