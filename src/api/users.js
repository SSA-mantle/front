import api from './index';

// Signup
export const signUp = async (userData) => {
  const response = await api.post('/users', userData);
  return response.data;
};

// Get My Info
export const getMyInfo = async () => {
  const response = await api.get('/users/me');
  return response.data;
};

// Update User Info
export const updateUser = async (userData) => {
  const response = await api.patch('/users/me', userData);
  return response.data;
};

// Get My Statistics
export const getMyStatistics = async () => {
  const response = await api.get('/users/me/statistics');
  return response.data;
};
