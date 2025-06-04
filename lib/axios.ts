import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const createInstance = () => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('GUYVERSATION_ACCESS_TOKEN');
    
    if (accessToken) {
      const tokenExpiration = checkTokenExpiration(accessToken);
      
      if (tokenExpiration.isExpired) {
        handleTokenExpiration();
        return config;
      }
      
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: unknown) => {
      const err = error as AxiosError;
      
      const isLoginRequest = err.config?.url?.includes('/auth/login');
      
      // Check if user is already on a login page (either homepage or admin login)
      const isOnLoginPage = typeof window !== 'undefined' && 
        (window.location.pathname === '/' || 
         window.location.pathname === '/admin' ||
         window.location.pathname === '/login');
      
      // Only handle token expiration if it's not a login request and not already on login page
      if (err.response && err.response.status === 401 && !isLoginRequest && !isOnLoginPage) {
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

function handleTokenExpiration() {
  Cookies.remove('GUYVERSATION_ACCESS_TOKEN');
  Cookies.remove('GUYVERSATION_USER_ID');
  
  if (typeof window !== 'undefined') {
    const userType = Cookies.get('GUYVERSATION_USER_TYPE');
    const isAdmin = userType === 'Admin' || window.location.pathname.includes('/admin');
    
    const message = 'Your session has expired. Please log in again.';
    
    sessionStorage.setItem('auth_expiry_message', message);
    
    // Redirect based on user type
    if (isAdmin) {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  }
}

const instance = createInstance();

export { instance as axios, checkTokenExpiration, handleTokenExpiration };
