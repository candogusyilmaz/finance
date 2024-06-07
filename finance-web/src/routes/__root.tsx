import {
  Link,
  Outlet,
  createRootRouteWithContext
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { AuthContext } from '../context/auth';

const theme = createTheme({
  autoContrast: true,
  defaultRadius: 'xs'
});

export const Route = createRootRouteWithContext<{
  auth: AuthContext;
}>()({
  component: Root
});

function Root() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <ModalsProvider>
          <Outlet />
        </ModalsProvider>
      </MantineProvider>
      <TanStackRouterDevtools />
    </>
  );
}
