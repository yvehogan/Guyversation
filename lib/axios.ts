import axios, { AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const refreshEndpoint = '/auth/refresh-token';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const createInstance = () => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('GUYVERSATION_ACCESS_TOKEN');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: unknown) => {
      const originalRequest = (error as AxiosError & { config: any }).config;
      const err = error as AxiosError;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const expiredToken = Cookies.get('GUYVERSATION_ACCESS_TOKEN');
        const refreshToken = Cookies.get('GUYVERSATION_REFRESH_TOKEN');

        if (!refreshToken || !expiredToken) {
          Cookies.remove('GUYVERSATION_ACCESS_TOKEN');
          Cookies.remove('GUYVERSATION_REFRESH_TOKEN');
          Cookies.remove('GUYVERSATION_USER_ID');
          if (
            typeof window !== 'undefined' &&
            !['/', '/admin', '/login'].includes(window.location.pathname)
          ) {
            const userType = Cookies.get('GUYVERSATION_USER_TYPE');
            const isAdmin = userType === 'Admin' || window.location.pathname.includes('/admin');
            window.location.href = isAdmin ? '/admin' : '/';
          }
          return Promise.reject(error);
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              const accessToken = token as string;
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const response = await axios.post(
            `${baseURL}${refreshEndpoint}`,
            {
              expiredToken,
              refreshToken,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          const newAccessToken = response.data?.accessToken;
          Cookies.set('GUYVERSATION_ACCESS_TOKEN', newAccessToken);

          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          Cookies.remove('GUYVERSATION_ACCESS_TOKEN');
          Cookies.remove('GUYVERSATION_REFRESH_TOKEN');
          Cookies.remove('GUYVERSATION_USER_ID');
          if (
            typeof window !== 'undefined' &&
            !['/', '/admin', '/login'].includes(window.location.pathname)
          ) {
            const userType = Cookies.get('GUYVERSATION_USER_TYPE');
            const isAdmin = userType === 'Admin' || window.location.pathname.includes('/admin');
            window.location.href = isAdmin ? '/admin' : '/';
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const instance = createInstance();

export { instance as axios };
