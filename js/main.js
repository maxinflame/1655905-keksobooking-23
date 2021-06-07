const getRandomFloatNumber = (from, to, accuracy) => {
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
};

const getRandomIntegerNumber = (from, to) => getRandomFloatNumber(from, to, 0);

const getRandomArrayElement = function (array) {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

const getFewRandomArrayElements = function (array) {
  const quantity = getRandomIntegerNumber(1, array.length);
  const elements = [];
  const usedElements = [];
  for (let i = 0; i < quantity; i++) {
    const element = getRandomArrayElement(array);
    if (!usedElements.includes(element)) {
      elements.push(element);
      usedElements.push(element);
    } else {
      i -= 1;
    }
  } return elements;
};

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
let avatarId = 0;

const createOffer = (lat, lng) => {
  const offer = {
    title: 'Сдам жилплощадь',
    address: lat + ', ' + lng,
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
      avatar: 'img/avatars/user0' + avatarId + '.png',
    },
    offer: createOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
};

const ads = new Array(10).fill(null).map(() => createAd());
console.log(ads);
