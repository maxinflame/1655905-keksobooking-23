import {TypeNames, TypeTexts} from './constants.js';
import { getKeyByValue } from './util.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderFeatures = (container, features) => {
  if (!features) {
    container.remove();
    return;
  }

  const modifiers = features.map((feature) => `popup__feature--${feature}`);
  container.querySelectorAll('.popup__feature')
    .forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
};

const renderPhotos = (container, photos) => {
  if (!photos) {
    container.remove();
    return;
  }

  const photoTemplate = container.querySelector('.popup__photo');
  photoTemplate.remove();
  photos.forEach((item) => {
    const photo = photoTemplate.cloneNode(true);
    photo.src = item;
    container.appendChild(photo);
  });
};

const getDisplayText = (value, emptyText, displayText) => {
  if (!value) {
    return emptyText;
  }

  return displayText;
};

const getGuestsText = (guests, rooms) => {
  if (guests && rooms) {
    return `${rooms} комнаты для ${guests} гостей`;
  }
  else if (guests) {
    return `Для ${guests} гостей`;
  }
  else if (rooms) {
    return `${rooms} комнаты`;
  }
};

const getCheckInText = (checkin, checkout) => {
  if (checkin && checkout) {
    return `Заезд после ${checkin}, выезд до ${checkout}`;
  }
  else if (checkin) {
    return `Заезд после ${checkin}`;
  }
  else if (checkout) {
    return `Выезд до ${checkout}`;
  }
};

const createPopup = function (item) {
  const cardElement = cardTemplate.cloneNode(true);
  const {
    author: {
      avatar,
    },
    offer: {
      title,
      address,
      price,
      type,
      features,
      description,
      photos,
      guests,
      rooms,
      checkin,
      checkout,
    },
  } = item;

  const typeName = getKeyByValue(TypeNames, type);

  cardElement.querySelector('.popup__title').textContent = title;

  cardElement.querySelector('.popup__text--address').textContent = address;

  cardElement.querySelector('.popup__text--price').textContent = getDisplayText(price, 'Цена не указана', `${price}₽/ночь`);

  cardElement.querySelector('.popup__type').textContent = getDisplayText(type, 'Тип жилья не указан', TypeTexts[typeName]);

  cardElement.querySelector('.popup__text--capacity').textContent = getGuestsText(guests, rooms);

  cardElement.querySelector('.popup__text--time').textContent = getCheckInText(checkin, checkout);

  const featureList = cardElement.querySelector('.popup__features');
  renderFeatures(featureList, features);

  cardElement.querySelector('.popup__description').textContent = description;

  const photoList = cardElement.querySelector('.popup__photos');
  renderPhotos(photoList, photos);

  cardElement.querySelector('.popup__avatar').src = getDisplayText(avatar, 'img/avatars/default.png', avatar);

  return cardElement;
};

export {createPopup};
