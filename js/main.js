const getRandomFloatNumber = (from, to, accuracy) => {
  const min = Math.min(from, to);
  const max = Math.max(from, to);
  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
};

const getRandomIntegerNumber = (from, to) => getRandomFloatNumber(from, to, 0);

getRandomIntegerNumber(19, 21);
getRandomFloatNumber(100, 120, 5);
