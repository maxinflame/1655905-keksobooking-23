import {updateMarkers} from './map.js';
import {MAX_AD_MARKERS} from './constants.js';
import { debounce } from './util.js';

const RERENDER_TIME = 500;
const FILTER_VALUE_ANY = 'any';
const PriceRangesNames = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
};

const PriceRanges = {
  LOW: 10000,
  HIGH: 50000,
};

const mapForm = document.querySelector('.map__filters');
const housingType = mapForm.querySelector('#housing-type');
const housingPrice = mapForm.querySelector('#housing-price');
const housingRooms = mapForm.querySelector('#housing-rooms');
const housingGuests = mapForm.querySelector('#housing-guests');
const checkboxes = mapForm.querySelectorAll('input[name="features"]');


let items = [];

const getCheckedCheckboxes = () => {
  const checkedCheckboxes = [];
  checkboxes.forEach((item) => {
    if (item.checked) {
      checkedCheckboxes.push(item);
    }
  });
  return checkedCheckboxes;
};

const filterByType = (ad) => {
  if (housingType.value !== FILTER_VALUE_ANY) {
    if (housingType.value !== ad.offer.type) {
      return false;
    }
  }
  return true;
};

const filterByPrice = (ad) => {
  if (housingPrice.value !== FILTER_VALUE_ANY) {
    switch (housingPrice.value) {
      case PriceRangesNames.MIDDLE:
        if (ad.offer.price < PriceRanges.LOW || ad.offer.price > PriceRanges.HIGH) {
          return false;
        } break;
      case PriceRangesNames.LOW:
        if (ad.offer.price > PriceRanges.LOW) {
          return false;
        } break;
      case PriceRangesNames.HIGH:
        if (ad.offer.price < PriceRanges.HIGH) {
          return false;
        } break;
    }
  }
  return true;
};

const filterByRooms = (ad) => {
  if (housingRooms.value !== FILTER_VALUE_ANY) {
    if (Number(housingRooms.value) !== ad.offer.rooms) {
      return false;
    }
  }
  return true;
};

const filterByGuests = (ad) => {
  if (housingGuests.value !== FILTER_VALUE_ANY) {
    if (Number(housingGuests.value) !== ad.offer.guests) {
      return false;
    }
  }
  return true;
};

const filterByFeatures = (ad) => {
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

const filterAds = (ad) => {
  if(!filterByType(ad) || !filterByPrice(ad) || !filterByRooms(ad) || !filterByGuests(ad) || !filterByFeatures(ad)) {
    return false;
  }
  return true;
};


const getFilteredAds = () => {
  const filtered = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isFiltered = filterAds(item);
    if (isFiltered) {
      filtered.push(item);
    }

    if (filtered.length === MAX_AD_MARKERS) {
      break;
    }
  }
  return filtered;
};

const applyFilter = () => {
  const filteredAds = getFilteredAds();
  updateMarkers(filteredAds);
};

const initFilter = (ads) => {
  items = ads.slice();
  applyFilter();
  mapForm.addEventListener('change', debounce(() => applyFilter(), RERENDER_TIME));
};

export {initFilter, applyFilter};
