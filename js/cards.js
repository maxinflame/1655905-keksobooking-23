import {OFFER_TYPES} from './constants.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderFeatures = (container, features) => {
  if (!features) {
    container.remove();
  } else {
    const modifiers = features.map((feature) => `popup__feature--${feature}`);
    container.querySelectorAll('.popup__feature')
      .forEach((item) => {
        const modifier = item.classList[1];
        if (!modifiers.includes(modifier)) {
          item.remove();
        }
      });
  }
};

const renderPhotos = (container, photos) => {
  if (!photos) {
    container.remove();
  } else {
    const photoTemplate = container.querySelector('.popup__photo');
    photoTemplate.remove();
    photos.forEach((item) => {
      const photo = photoTemplate.cloneNode(true);
      photo.src = item;
      container.appendChild(photo);
    });
  }
};

const createCard = function (template, element) {
  const cardElement = template.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = element.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = element.offer.address;

  if (!element.offer.price) {
    cardElement.querySelector('.popup__text--price').textContent = 'Цена не указана';
  } else {cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;}

  if (!element.offer.type) {
    cardElement.querySelector('.popup__type').textContent = 'Тип жилья не указан';
  } else {
    cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[element.offer.type];
  }

  if (element.offer.rooms && element.offer.guests) {cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;}
  else if (!element.offer.rooms) {cardElement.querySelector('.popup__text--capacity').textContent = `Для ${element.offer.guests} гостей`;}
  else if (!element.offer.guests) {cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты`;}

  if (element.offer.checkin && element.offer.checkout) {cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;}
  else if (!element.offer.checkin) {cardElement.querySelector('.popup__text--time').textContent = `Выезд до ${element.offer.checkout}`;}
  else if (!element.offer.checkout) {cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}`;}

  const features = cardElement.querySelector('.popup__features');
  renderFeatures(features, element.offer.features);

  cardElement.querySelector('.popup__description').textContent = element.offer.description;

  const photos = cardElement.querySelector('.popup__photos');
  renderPhotos(photos, element.offer.photos);

  if (!element.author) {
    cardElement.querySelector('.popup__avatar').src = 'img/avatars/default.png';
  } else {
    cardElement.querySelector('.popup__avatar').src = element.author.avatar;
  }
  return cardElement;
};

const createCards = function (ads, fragment) {
  ads.forEach((element) => {
    const card = createCard(cardTemplate, element);
    fragment.appendChild(card);
  });
  return fragment;
};

export {createCards};
