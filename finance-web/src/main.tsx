import {
  ErrorComponent,
  RouterProvider,
  createRouter
} from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider, useAuth } from './utils/auth';

import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div className={'p-2 text-2xl'}>loading</div>,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: {
    // biome-ignore lint/style/noNonNullAssertion: We'll inject this when we render
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
