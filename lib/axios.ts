import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const createInstance = () => {
  const instance = axios.create({
    baseURL,
  });

  // Add request interceptor to check token expiration before each request
  instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('GUYVERSATION_ACCESS_TOKEN');
    
    // Check if token exists
    if (accessToken) {
      // Check if token is expired
      const tokenExpiration = checkTokenExpiration(accessToken);
      
      if (tokenExpiration.isExpired) {
        // Handle token expiration
        handleTokenExpiration();
        // Don't add the expired token to the request
        return config;
      }
      
      // Add valid token to headers
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: unknown) => {
      const err = error as AxiosError;
      if (err.response && err.response.status === 401) {
        handleTokenExpiration();

        return Promise.reject({
          error,
          handled: true,
        });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

function checkTokenExpiration(token: string) {
  if (!token) return { isExpired: true };
  
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();
    
    return { 
      isExpired: currentTime > expirationTime,
      payload 
    };
  } catch (error) {
    console.error('Error parsing token:', error);
    return { isExpired: true };
  }
}

// Handle token expiration and redirect
function handleTokenExpiration() {
  // Clear all auth cookies
  Cookies.remove('GUYVERSATION_ACCESS_TOKEN');
  Cookies.remove('GUYVERSATION_USER_ID');
  
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    // Check if user is admin by checking the current URL
    const isAdmin = window.location.pathname.includes('/admin');
    
    // Create an expiration message
    const message = 'Your session has expired. Please log in again.';
    
    // Store the message in sessionStorage to display after redirect
    sessionStorage.setItem('auth_expiry_message', message);
    
    // Redirect based on user type
    if (isAdmin) {
      window.location.href = '/admin';
    } else {
      window.location.href = '/login';
    }
  }
}

const instance = createInstance();

export { instance as axios, checkTokenExpiration, handleTokenExpiration };
