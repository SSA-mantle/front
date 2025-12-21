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
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if needed
      // window.location.href = '/'; // Optional: Redirect or let the component handle it
    }
    return Promise.reject(error);
  }
);

export default api;
