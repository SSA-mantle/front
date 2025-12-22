import api from './index';

// Get Leaderboard
export const getLeaderboard = (date) => {
  const params = date ? { date } : {};
  return api.get('/leaderboard', { params });
};
