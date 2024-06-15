import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import 'mantine-datatable/styles.layer.css';
import { QueryClientProvider } from 'react-query';
import { DefaultQueryClient } from 'src/react-query';
import { MantineTheme } from 'src/theme';
import NotFound from '../components/NotFound/NotFound';
import '../styles.css';
import type { AuthContext } from '../utils/auth';

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
}>()({
  component: Root,
  notFoundComponent: NotFound
});

function Root() {
  return (
    <QueryClientProvider client={DefaultQueryClient}>
      <MantineProvider theme={MantineTheme} defaultColorScheme="light">
        <Notifications />
        <ModalsProvider>
          <Outlet />
        </ModalsProvider>
      </MantineProvider>
      <TanStackRouterDevtools />
    </QueryClientProvider>
  );
}
