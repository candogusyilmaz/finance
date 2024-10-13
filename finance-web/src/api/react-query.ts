import { notifications } from '@mantine/notifications';
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import type { ApiError } from './types/Defaults';

const mutationCache = new MutationCache({
  onSettled: (error, _variables, _context, _mutation) => {
    if (error instanceof AxiosError && error.code === 'ERR_NETWORK') {
      notifications.show({
        title: 'Bağlantı Hatası',
        message: 'Sunucuya bağlanırken hata oluştu. Lütfen daha sonra tekrar deneyin.',
        color: 'red'
      });
    }

    if (error instanceof AxiosError && !(error as ApiError).response?.data['invalid-params']) {
      notifications.show({
        color: 'red',
        message: error.response?.data.detail
      });
    }
  }
});

export const DefaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: false
    }
  },
  mutationCache
});
