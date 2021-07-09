import {activatePage} from './form.js';
import {createPopup} from './cards.js';

const centerCoordinates = {
  lat: 	35.6895,
  lng: 139.692,
};

const inputAddress = document.querySelector('#address');
inputAddress.readOnly = true;

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView ({
    lat: 	centerCoordinates.lat,
    lng: centerCoordinates.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const putCoordinatesInAddress = () => {
  const coordinates = mainPinMarker.getLatLng();
  inputAddress.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

putCoordinatesInAddress();
mainPinMarker.on('moveend', putCoordinatesInAddress);

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (ad) => {
  const marker = L.marker({
    lat: ad.location.lat,
    lng: ad.location.lng,
  },
  {
    icon: pinIcon,
  });

  marker
    .addTo(map)
    .bindPopup(createPopup(ad));
};

export {createMarker};
