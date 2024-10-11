import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { DatesProvider } from '@mantine/dates';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'mantine-datatable/styles.layer.css';
import { QueryClientProvider } from 'react-query';
import NotFound from 'src/components/Shared/NotFound/NotFound';
import { DefaultQueryClient } from 'src/react-query';
import { MantineTheme } from 'src/theme';
import '../styles.css';
import type { AuthContext } from '../utils/auth';

dayjs.extend(customParseFormat);

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
        <DatesProvider settings={{ locale: 'tr' }}>
          <ModalsProvider>
            <Outlet />
          </ModalsProvider>
        </DatesProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
}
