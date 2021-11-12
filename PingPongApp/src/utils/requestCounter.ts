let requestCounter = 0;

export const increaseCounter = () => {
  requestCounter += 1;
  return requestCounter;
};

export const getPingPongs = () => {
  return requestCounter;
};
