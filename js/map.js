import {createPopup} from './cards.js';
import {CenterCoordinates} from './constants.js';
import {updateAddress} from './form.js';

const  MAIN_PIN_ICON_SIZE = [52, 52];
const PIN_ICON_SIZE = [40, 40];
const PinIconUrl= {
  mainIcon: '../img/main-pin.svg',
  regularPin: '../img/pin.svg',
};

let mainPinMarker = null;
let defaultMainPinCoordinates = null;
let map = null;
const markers = [];

const createMarker = (lat, lng, icon, isDraggable) => L.marker(
  {
    lat: lat,
    lng: lng,
  },
  {
    icon: icon,
    draggable: isDraggable,
  },
);

const createMap = (onMapLoaded) => {
  map = L.map('map-canvas')
    .on('load', () => {
      onMapLoaded();
    })
    .setView ({
      lat: 	CenterCoordinates.LAT,
      lng: CenterCoordinates.LNG,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const createPinIcon = (iconUrl, iconSize) => {
  const icon = L.icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
  });
  return icon;
};

const initMainPin = () => {
  mainPinMarker = createMarker(CenterCoordinates.LAT, CenterCoordinates.LNG, createPinIcon(PinIconUrl.mainIcon, MAIN_PIN_ICON_SIZE), true);
  defaultMainPinCoordinates = mainPinMarker.getLatLng();
  updateAddress(defaultMainPinCoordinates);

  mainPinMarker.on('move', (evt) => {
    const mainPinCoordinates = evt.target.getLatLng();
    updateAddress(mainPinCoordinates);
  });
  mainPinMarker.addTo(map);
};

const getMarker = (ad) => {
  const {
    location: { lat, lng },
  } = ad;
  return createMarker(lat, lng, createPinIcon(PinIconUrl.regularPin, PIN_ICON_SIZE), false);
};

const renderMarkers = (ads) => {
  ads.forEach((ad) => {
    const marker = getMarker(ad);
    marker.bindPopup(createPopup(ad));
    marker.addTo(map);
    markers.push(marker);
  });
};

const deleteMarkers = () => {
  markers.forEach((item) => {
    item.remove();
  });
};

const updateMarkers = (ads) => {
  deleteMarkers();
  renderMarkers(ads);
};

const resetMainPin = ()=> {
  mainPinMarker.setLatLng(defaultMainPinCoordinates);
  updateAddress(defaultMainPinCoordinates);
};

const initMap = (onMapLoaded) => {
  createMap(onMapLoaded);
  initMainPin();
};

export {initMap, resetMainPin, updateMarkers};
