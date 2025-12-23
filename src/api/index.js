import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Interceptor
// Use a custom adapter if Mock mode is on.

if (import.meta.env.VITE_USE_MOCK === 'true') {
    const { mockHandler } = await import('./mockHandlers');
    api.defaults.adapter = mockHandler;
    console.log("⚠️ API Mock Mode Activated");
}

// Request Interceptor: Add Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Errors (e.g., 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');

        // If no refresh token, fail immediately
        if (!refreshToken) {
            throw new Error("No refresh token");
        }

        // Call refresh endpoint
        // Use a new axios instance to avoid interceptor loops
        const { data } = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
            refreshToken
        });

        if (data && data.success && data.data) {
             const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data;

             // Update Tokens
             localStorage.setItem('accessToken', newAccessToken);
             localStorage.setItem('refreshToken', newRefreshToken);

             // Update Header and Retry
             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
             return api(originalRequest);
        }

      } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          // Clear tokens and redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          sessionStorage.removeItem('ssa_intro_seen'); // Optional cleanup

          // Redirect to home/login
          window.location.href = '/';
          return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
