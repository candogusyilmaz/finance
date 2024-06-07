import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState
} from '@tanstack/react-router';
import type React from 'react';
import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../context/auth';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      //throw redirect({ to: search.redirect ?? "/dashboard" });
    }
  },
  component: Login
});

function Login() {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const search = Route.useSearch();

  // todo use react query possibly
  const onFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    try {
      evt.preventDefault();
      const data = new FormData(evt.currentTarget);
      const fieldValue = data.get('username');

      if (!fieldValue) return;
      const username = fieldValue.toString();
      await auth.login(username);

      await router.invalidate();

      await navigate({ to: search.redirect ?? '/dashboard' });
    } catch (error) {
      console.error('Error logging in: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Container size={420} style={{ width: 600 }}>
        <Title ta="center" fw={900}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" loading={true}>
            Sign in
          </Button>
        </Paper>
      </Container>
    </Flex>
  );
}
