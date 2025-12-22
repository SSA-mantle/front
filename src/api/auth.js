import api from './index';

// Login
export const signIn = async (email, password) => {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
};

// Refresh Token
export const refreshToken = async (token) => {
  const response = await api.post('/auth/refresh', { refreshToken: token });
  return response.data;
};
