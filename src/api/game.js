import api from './index';

export const guessWord = (word, failCount) => {
  return api.post('/games/guess', { word, failCount });
};

export const giveUpGame = () => {
  return api.post('/games/give-up');
};

// Get Today's Answer History (Correct word and Top 100)
export const getTodayHistory = () => {
  return api.get('/games/answer-history/today');
};

// Get Yesterday's Answer History
export const getYesterdayHistory = () => {
  return api.get('/games/answer-history/yesterday');
};
