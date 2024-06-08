import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
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
  }
});

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
}>()({
  component: Root
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
