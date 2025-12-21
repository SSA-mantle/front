import api from './index';

export const guessWord = (word, failCount) => {
  return api.post('/games/guess', { word, failCount });
};

export const giveUpGame = () => {
  return api.post('/games/give-up');
};
