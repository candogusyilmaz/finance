import { notifications } from '@mantine/notifications';
import { MutationCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const mutationCache = new MutationCache({
  onSettled: (error, _variables, _context, _mutation) => {
    showNotificationIfNetworkError(error);
  }
});

function showNotificationIfNetworkError(error: unknown) {
  const axiosError = error instanceof AxiosError;

  if (!axiosError) return;

  if (error.code === 'ERR_NETWORK') {
    notifications.show({
      title: 'Bağlantı Hatası',
      message: 'Sunucuya bağlanırken hata oluştu. Lütfen daha sonra tekrar deneyin.',
      color: 'red'
    });
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: false
    }
  },
  mutationCache
});
