import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { MutationCache, QueryClient } from 'react-query';

const mutationCache = new MutationCache({
  onError(error, _variables, _context, _mutation) {
    if (error instanceof AxiosError && error.code === 'ERR_NETWORK') {
      notifications.show({
        title: 'Bağlantı Hatası',
        message: 'Sunucuya bağlanırken hata oluştu. Lütfen daha sonra tekrar deneyin.',
        color: 'red'
      });
    }
  }
});

export const DefaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      cacheTime: 10000,
      retry: false
    }
  },
  mutationCache
});
