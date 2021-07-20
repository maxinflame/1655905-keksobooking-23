import {deleteAdMarkers, createAdMarker} from './map.js';
import {MAX_AD_MARKERS} from './constants.js';

const mapForm = document.querySelector('.map__filters');
const housingType = mapForm.querySelector('#housing-type');
const housingPrice = mapForm.querySelector('#housing-price');
const housingRooms = mapForm.querySelector('#housing-rooms');
const housingGuests = mapForm.querySelector('#housing-guests');
const checkboxes = mapForm.querySelectorAll('input[name="features"]');

const getCheckedCheckboxes = () => {
  const checkedCheckboxes = [];
  checkboxes.forEach((item) => {
    if (item.checked) {
      checkedCheckboxes.push(item);
    }
  });
  return checkedCheckboxes;
};

const filterAds = (ad) => {
  if (housingType.value !== 'any') {
    if (housingType.value !== ad.offer.type) {
      return false;
    }
  }

  if (housingPrice.value !== 'any') {
    switch (housingPrice.value) {
      case 'middle':
        if (ad.offer.price < 10000 || ad.offer.price > 50000) {
          return false;
        } break;
      case 'low':
        if (ad.offer.price > 10000) {
          return false;
        } break;
      case 'high':
        if (ad.offer.price < 50000) {
          return false;
        } break;
    }
  }

  if (housingRooms.value !== 'any') {
    if (Number(housingRooms.value) !== ad.offer.rooms) {
      return false;
    }
  }

  if (housingGuests.value !== 'any') {
    if (Number(housingGuests.value) !== ad.offer.guests) {
      return false;
    }
  }

  const checkedCheckboxes = getCheckedCheckboxes();
  if (checkedCheckboxes.length > 0) {
    if (ad.offer.features) {
      let isAllFeaturesIncludes = true;
      checkedCheckboxes.forEach((item) => {
        if (!ad.offer.features.includes(item.value)) {
          isAllFeaturesIncludes = false;
        }
      });
      if (!isAllFeaturesIncludes) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
};

const getFilteredAds = (ads) => {
  const filteredAds = ads.filter(filterAds);
  return filteredAds;
};

const rerenderMarkers = (ads) => {
  deleteAdMarkers();
  const filteredAds = getFilteredAds(ads);
  filteredAds
    .slice(0, MAX_AD_MARKERS)
    .forEach(createAdMarker);
};

export {rerenderMarkers};
