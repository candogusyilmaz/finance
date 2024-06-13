import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications, notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AxiosError } from 'axios';
import 'mantine-datatable/styles.layer.css';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import NotFound from '../components/NotFound/NotFound';
import '../styles.css';
import type { AuthContext } from '../utils/auth';
const theme = createTheme({
  autoContrast: true,
  defaultRadius: 'xs'
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      cacheTime: 10000
    }
  },
  mutationCache: new MutationCache({
    onError(error, _variables, _context, _mutation) {
      if (error instanceof AxiosError && error.code === 'ERR_NETWORK') {
        notifications.show({
          title: 'Bağlantı Hatası',
          message:
            'Sunucuya bağlanırken hata oluştu. Lütfen daha sonra tekrar deneyin.',
          color: 'red'
        });
      }
    }
  })
});

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
}>()({
  component: Root,
  notFoundComponent: NotFound
});

function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <ModalsProvider>
          <Outlet />
        </ModalsProvider>
      </MantineProvider>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
