const getRandomIntegerNumber = (min, max) => {
  if (max > min) {
    return Math.round(Math.random() * (max - min) + min);
  }

  return Math.round(Math.random() * (min - max) + max);
};

const getRandomFloatNumber = (min, max, accuracy) => {
  if (max > min) {
    return (Math.random() * (max - min) + min).toFixed(accuracy);
  }

  return (Math.random() * (min - max) + max).toFixed(accuracy);
};

getRandomIntegerNumber(20, 25);
getRandomFloatNumber(100, 120, 5);
