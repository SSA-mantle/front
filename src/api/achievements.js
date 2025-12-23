import api from './index';

// Get My Achievements
export const getMyAchievements = async () => {
  const response = await api.get('/achievements/me');
  return response.data;
};
