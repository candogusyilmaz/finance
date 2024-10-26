import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { AuthenticatedLayout } from 'src/components/layouts/authenticated-layout/authenticated-layout';

export const Route = createFileRoute('/_authenticated')({
  component: Layout,
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});

export function Layout() {
  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  );
}
