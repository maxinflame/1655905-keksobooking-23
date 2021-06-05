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

const usedAvatarId = [];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const time = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Только для японцев! Китайцам просьба не беспокоить', 'Можно с любыми животными кроме медоедов', 'Членам якудза скидка'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createAuthor = () => {
  let avatarId = false;
  let i = 1;
  while (!avatarId) {
    if (!usedAvatarId.includes(i)) {
      avatarId = i;
      usedAvatarId.push(avatarId);
    }
    else {
      i += 1;
    }
  }
  const author = {
    avatar: 'img/avatars/user0' + avatarId + '.png'
  };
  return author;
};

const createOffer = (lat, lng) => {
  const offer = {
    title: 'Сдам жилплощадь',
    address: lat + ', ' + lng,
    price: getRandomIntegerNumber(2000, 50000),
    type: getRandomArrayElement(types),
    rooms: getRandomIntegerNumber(1, 4),
    guests: getRandomIntegerNumber(1, 8),
    checkin: getRandomArrayElement(time),
    checkout: getRandomArrayElement(time),
    features: getFewRandomArrayElements(features),
    description: getRandomArrayElement(descriptions),
    photos: getFewRandomArrayElements(photos),
  };
  return offer;
};

const createAd = () => {
  const lat = getRandomFloatNumber(35.65, 35.7, 5);
  const lng = getRandomFloatNumber(139.7, 139.8, 5);
  const ad = {
    author: createAuthor(),
    offer: createOffer(lat, lng),
    location: {
      lat: lat,
      lng: lng,
    },
  };
  return ad;
};

const ads = new Array(10).fill('null').map(() => createAd());
console.log(ads);
