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

  // Update User Info
  updateUser: async (userData) => {
    // Using PATCH for partial updates, or PUT. 
    // Based on "update-user-response.json", we'll assume the endpoint is /users/me
    const response = await api.patch('/users/me', userData);
    return response.data;
  },
};
