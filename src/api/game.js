import api from './index';

export const guessWord = async (word, failCount) => {
  const response = await api.post('/games/guess', { word, failCount });
  return response.data;
};

export const giveUpGame = async () => {
  const response = await api.post('/games/give-up');
  return response.data;
};

// Get Today's Answer History (Correct word and Top 100)
export const getTodayHistory = async () => {
  const response = await api.get('/games/answer-history/today');
  return response.data;
};

// Get Yesterday's Answer History
export const getYesterdayHistory = async () => {
  const response = await api.get('/games/answer-history/yesterday');
  return response.data;
};
