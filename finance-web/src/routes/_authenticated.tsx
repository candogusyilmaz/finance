import { Flex } from '@mantine/core';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Navbar } from '../components/Shared/Nav/Navbar';

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
    <Flex h="100%">
      <Navbar />
      <Flex direction="column" p="xl" w="100%" h="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
}
