import api from './index';

export const authApi = {
  // Login
  signIn: async (email, password) => {
    const response = await api.post('/auth/sign-in', { email, password });
    return response.data;
  },

  // Signup
  signUp: async (userData) => {
    const response = await api.post('/users/sign-up', userData);
    return response.data;
  },

  // Get My Info
  getMyInfo: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  // Refresh Token
  refreshToken: async (token) => {
    const response = await api.post('/auth/refresh', { refreshToken: token });
    return response.data;
  },
};
