import api from './index';

// Get Leaderboard
export const getLeaderboard = async (date) => {
  const params = date ? { date } : {};
  const response = await api.get('/leaderboard', { params });
  return response.data;
};
