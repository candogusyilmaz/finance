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
import { notifications } from '@mantine/notifications';
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState
} from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';
import { useCreateAccessToken } from '../api/token-controller';
import { useAuth } from '../utils/auth';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.user) {
      throw redirect({ to: search.redirect ?? '/dashboard' });
    }
  },
  component: Login
});

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const isRouterLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();

  const search = Route.useSearch();

  const auth = useAuth();

  const login = useCreateAccessToken({
    mutation: {
      async onSuccess(data) {
        await auth.login(data.data);
        await router.invalidate();
        await navigate({ to: search.redirect ?? '/dashboard' });
      },
      onError(error) {
        if (error.response?.status === 401) {
          notifications.show({
            message: 'Kullanici adi veya sifre hatali!',
            color: 'red'
          });
        }

        setPassword('');
      }
    }
  });

  const handleLogin = async () => {
    await login.mutateAsync({
      data: {
        username,
        password
      }
    });
  };

  return (
    <Flex justify="center" align="center" style={{ height: '100%' }}>
      <Container size={420} style={{ width: 600 }}>
        <Title ta="center" fw={900}>
          Tekrar Hosgeldin
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Uygulamayi kullanmaya baslamak icin giris yap!
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            mt="xl"
            loading={login.isLoading || isRouterLoading}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </Flex>
  );
}
