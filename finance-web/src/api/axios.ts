import { useNavigate, useRouter } from '@tanstack/react-router';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { type ReactNode, useEffect } from 'react';
import { getStoredUser, useAuth } from 'src/utils/auth';

export const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL ?? 'http://localhost:8080/api/',
  withCredentials: true,
  xsrfHeaderName: 'X-XSRF-TOKEN',
  xsrfCookieName: 'XSRF-TOKEN'
});

function responseInterceptorSuccess(response: AxiosResponse) {
  return response;
}

api.interceptors.request.use((config) => {
  if (!config?.headers) {
    throw new Error("Expected 'config' and 'config.headers' not to be undefined");
  }

  if (config.url === '/auth/token' || config.url === '/auth/refresh-token') {
    config.headers.Authorization = undefined;
  } else {
    const user = getStoredUser();

    if (!user?.token) {
      throw new Error('TOKEN_NOT_FOUND');
    }

    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

function isUnauthorizedResponse(error: AxiosError<unknown>) {
  return error.response?.status === 401 && error.response?.headers['www-authenticate']?.startsWith('Bearer error="invalid_token"');
}

export const AxiosResponseInterceptor = ({ children }: { children: ReactNode }) => {
  const { logout, login } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const respInterceptor = axios.interceptors.response.use(responseInterceptorSuccess, async (error: AxiosError<unknown>) => {
      if (error instanceof Error && error.message === 'TOKEN_NOT_FOUND') {
        await logout();
        await new Promise((r) => setTimeout(r, 1));
        await router.invalidate();
        await navigate({ to: '/login' });
        return;
      }

      if (isUnauthorizedResponse(error)) {
        const result = await axios.post('/auth/refresh-token');

        if (result.status !== 200) {
          await login(result.data);
          await new Promise((r) => setTimeout(r, 1));
          await router.invalidate();
          await navigate({ to: '/login' });
          return;
        }

        return axios(error.config ?? {});
      }

      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.response.eject(respInterceptor);
    };
  }, [login, logout, navigate, router.invalidate]);

  return children;
};
