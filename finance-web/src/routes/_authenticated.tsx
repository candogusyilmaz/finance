import { Flex } from '@mantine/core';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Navbar } from '../components/Nav/Navbar';

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
    <Flex style={{ height: '100%' }}>
      <Navbar />
      <Flex p="xl">
        <Outlet />
      </Flex>
    </Flex>
  );
}
