import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { authApi } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('accessToken') || null);
  const refreshToken = ref(localStorage.getItem('refreshToken') || null);

  const isAuthenticated = computed(() => !!token.value);

  // Login Action
  const login = async (email, password) => {
    try {
      const data = await authApi.signIn(email, password);
      // Assuming response structure matches docs: { success: true, data: { accessToken, refreshToken, ... } }
      // Adjust based on actual response structure if needed
      if (data.success && data.data) {
        setToken(data.data.accessToken, data.data.refreshToken);
        await fetchUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login Failed:', error);
      throw error;
    }
  };

  // Sign Up Action
  const signup = async (userData) => {
      try {
          const data = await authApi.signUp(userData);
          return data.success;
      } catch (error) {
          console.error('Signup Failed:', error);
          throw error;
      }
  }


  // Fetch User Info
  const fetchUser = async () => {
    try {
      const data = await authApi.getMyInfo();
      if (data.success) {
        user.value = data.data;
      }
    } catch (error) {
      console.error('Fetch User Failed:', error);
      logout(); // If fetching user fails (e.g. invalid token), logout
    }
  };

  // Update Profile
  const updateProfile = async (userData) => {
      try {
          const data = await authApi.updateUser(userData);
          if (data.success && data.data) {
              // Update local state immediately
              user.value = { ...user.value, ...data.data };
              return true;
          }
          return false;
      } catch (error) {
          console.error('Update Profile Failed:', error);
          throw error;
      }
  };

  // Logout Action
  const logout = () => {
    user.value = null;
    token.value = null;
    refreshToken.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  // Helper: Set Token
  const setToken = (newAccessToken, newRefreshToken) => {
    token.value = newAccessToken;
    refreshToken.value = newRefreshToken;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    signup,
    logout,
    logout,
    fetchUser,
    updateProfile
  };
});
