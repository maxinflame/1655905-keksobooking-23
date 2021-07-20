import {activatePage, deactivatePage} from './util.js';
import {createPopup} from './cards.js';
import {CenterCoordinates} from './constants.js';
import {updateAddress} from './form.js';

const  MAIN_PIN_ICON_SIZE = [52, 52];
const PIN_ICON_SIZE = [40, 40];
const PinIconUrl= {
  mainIcon: '../img/main-pin.svg',
  regularPin: '../img/pin.svg',
};

deactivatePage();

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
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

const createMarker = (lat, lng, icon, isDraggable) => {
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      icon: icon,
      draggable: isDraggable,
    },
  );
  marker.addTo(map);
  return marker;
};

const createPinIcon = (iconUrl, iconSize) => {
  const icon = L.icon({
    iconUrl: iconUrl,
    iconSize: iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
  });
  return icon;
};

const mainPinMarker = createMarker(CenterCoordinates.LAT, CenterCoordinates.LNG, createPinIcon(PinIconUrl.mainIcon, MAIN_PIN_ICON_SIZE), true);

const DefaultMainPinCoordinates = mainPinMarker.getLatLng();
updateAddress(DefaultMainPinCoordinates);

mainPinMarker.on('moveend', (evt) => {
  const mainPinCoordinates = evt.target.getLatLng();
  updateAddress(mainPinCoordinates);
});

const adMarkers = [];

const createAdMarker = (ad) => {
  const marker = createMarker(ad.location.lat, ad.location.lng, createPinIcon(PinIconUrl.regularPin, PIN_ICON_SIZE), false);
  marker.bindPopup(createPopup(ad));
  adMarkers.push(marker);
};

const deleteAdMarkers = () => {
  adMarkers.forEach((item) => {
    item.remove();
  });
};

const resetMainPin = ()=> {
  mainPinMarker.setLatLng(DefaultMainPinCoordinates);
  updateAddress(DefaultMainPinCoordinates);
};


export {createAdMarker, resetMainPin, deleteAdMarkers};
