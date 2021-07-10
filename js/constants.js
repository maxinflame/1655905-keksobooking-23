const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['Только для японцев! Китайцам просьба не беспокоить', 'Можно с любыми животными кроме медоедов', 'Членам якудза скидка'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const MIN_PRICE = 50000;
const MAX_PRICE = 2000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 4;
const MIN_GUESTS = 1;
const MAX_GUESTS = 8;
const MIN_LAT = 35.65;
const MAX_LAT = 35.7;
const MIN_LNG = 139.7;
const MAX_LNG = 139.8;
const COORDINATION_ACCURACY = 5;
const OFFER_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const CenterCoordinates = {
  lat: 	35.6895,
  lng: 139.692,
};

export{TYPES, TIMES, FEATURES, DESCRIPTIONS, PHOTOS, MIN_PRICE, MAX_PRICE, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS, MIN_LAT, MAX_LAT, MIN_LNG, MAX_LNG, COORDINATION_ACCURACY, OFFER_TYPES, CenterCoordinates};
