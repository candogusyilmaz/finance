import { Flex } from '@mantine/core';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Login } from 'src/features/login';
import { z } from 'zod';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.user) {
      throw redirect({ to: search.redirect ?? '/' });
    }
  },
  component: Layout
});

function Layout() {
  return (
    <Flex justify="center" align="center" h="100dvh">
      <Login w={465} />
    </Flex>
  );
}
