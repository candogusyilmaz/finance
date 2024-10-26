import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, useAuth } from './utils/auth';

import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { queryClient } from './api/react-query';
import { FullscreenLoader } from './components/ui/fullscreen-loader';
import { routeTree } from './routeTree.gen';
import { MantineTheme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';
import './styles.css';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

const router = createRouter({
  routeTree,
  defaultPendingComponent: FullscreenLoader,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    auth: undefined!
  },
  defaultPreload: 'intent'
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <Helmet>
          <title>Finance | Canverse</title>
          <link rel="canonical" href="https://fin.canverse.dev/" />
        </Helmet>
        <QueryClientProvider client={queryClient}>
          <MantineProvider theme={MantineTheme} defaultColorScheme="light">
            <Notifications />
            <DatesProvider settings={{ locale: 'tr' }}>
              <ModalsProvider>
                <App />
              </ModalsProvider>
            </DatesProvider>
          </MantineProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </StrictMode>
  );
}
