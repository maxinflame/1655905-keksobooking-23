const createCards = function (ads) {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const cardsListFragment = document.createDocumentFragment();

  ads.forEach((element) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = element.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = element.offer.address;

    if (!element.offer.price) {
      cardElement.querySelector('.popup__text--price').textContent = 'Цена не указана';
    } else {cardElement.querySelector('.popup__text--price').textContent = `${element.offer.price}₽/ночь`;}

    if (element.offer.type === 'flat') {
      cardElement.querySelector('.popup__type').textContent = 'Квартира';
    }
    else if (element.offer.type === 'bungalow') {
      cardElement.querySelector('.popup__type').textContent = 'Бунгало';
    }
    else if (element.offer.type === 'house') {
      cardElement.querySelector('.popup__type').textContent = 'Дом';
    }
    else if (element.offer.type === 'palace') {
      cardElement.querySelector('.popup__type').textContent = 'Дворец';
    }
    else if (element.offer.type === 'hotel') {
      cardElement.querySelector('.popup__type').textContent = 'Отель';
    } else {cardElement.querySelector('.popup__type').textContent = 'Тип жилья не указан';}

    if (element.offer.rooms && element.offer.guests) {cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;}
    else if (!element.offer.rooms) {cardElement.querySelector('.popup__text--capacity').textContent = `Для ${element.offer.guests} гостей`;}
    else if (!element.offer.guests) {cardElement.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты`;}

    if (element.offer.checkin && element.offer.checkout) {cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;}
    else if (!element.offer.checkin) {cardElement.querySelector('.popup__text--time').textContent = `Выезд до ${element.offer.checkout}`;}
    else if (!element.offer.checkout) {cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}`;}

    const features = cardElement.querySelector('.popup__features');
    if (!element.offer.features) {
      features.remove();
    } else {
      const modifiers = element.offer.features.map((feature) => `popup__feature--${feature}`);
      features.querySelectorAll('.popup__feature')
        .forEach((item) => {
          const modifier = item.classList[1];
          if (!modifiers.includes(modifier)) {
            item.remove();
          }
        });
    }

    cardElement.querySelector('.popup__description').textContent = element.offer.description;

    const photos = cardElement.querySelector('.popup__photos');
    if (!element.offer.photos) {
      photos.remove();
    } else {
      const photoTemplate = photos.querySelector('.popup__photo');
      photoTemplate.remove();
      element.offer.photos.forEach((item) => {
        const photo = photoTemplate.cloneNode(true);
        photo.src = item;
        photos.appendChild(photo);
      });
    }

    if (!element.author) {
      cardElement.querySelector('.popup__avatar').src = 'img/avatars/default.png';
    } else {
      cardElement.querySelector('.popup__avatar').src = element.author.avatar;
    }
    cardsListFragment.appendChild(cardElement);
  });
  return cardsListFragment;
};

export {createCards};
