import { ErrorComponent, RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, useAuth } from './utils/auth';

import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { routeTree } from './routeTree.gen';

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
  defaultPendingComponent: () => <div className={'p-2 text-2xl'}>loading</div>,
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

// biome-ignore lint/style/noNonNullAssertion:
const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
