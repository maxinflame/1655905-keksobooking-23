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

export {getRandomFloatNumber, getRandomIntegerNumber, getRandomArrayElement, getFewRandomArrayElements};
