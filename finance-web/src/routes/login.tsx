import { Alert, Button, Container, Flex, Paper, PasswordInput, Text, TextInput, Title, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconAlertTriangle, IconLock, IconUser } from '@tabler/icons-react';
import { createFileRoute, redirect, useRouter, useRouterState } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { api } from 'src/api/axios';
import type { ApiError } from 'src/api/types/Defaults';
import type { CreateAccessTokenRequest, CreateAccessTokenResponse } from 'src/api/types/TokenTypes';
import { FieldErrorMessage } from 'src/utils/zod-messages';
import { z } from 'zod';
import { useAuth } from '../utils/auth';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch('')
  }),
  beforeLoad: ({ context, search, preload }) => {
    if (preload) return;

    if (context.auth.user) {
      throw redirect({ to: search.redirect ?? '/dashboard' });
    }
  },
  component: Login
});

const loginSchema = z.object({
  username: z.string(FieldErrorMessage('Kullanıcı adı')).min(3, 'En az 3 karakter olmalıdır.'),
  password: z.string(FieldErrorMessage('Şifre')).min(3, 'En az 3 karakter olmalıdır.')
});

function Login() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: ''
    },
    validate: zodResolver(loginSchema)
  });

  const router = useRouter();
  const isRouterLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();

  const search = Route.useSearch();

  const auth = useAuth();

  const login = useMutation({
    mutationFn: async (data: CreateAccessTokenRequest) => {
      return (await api.post<CreateAccessTokenResponse>('/auth/token', data)).data;
    },
    async onSuccess(data) {
      await auth.login(data);
      await new Promise((r) => setTimeout(r, 1));
      await navigate({ to: search.redirect ?? '/dashboard' });
      await router.invalidate();
    },
    onError(_error: ApiError) {
      form.reset();
    }
  });

  return (
    <Flex justify="center" align="center" h="100dvh" bg="dark.8">
      <Container w={rem(520)}>
        <Paper withBorder shadow="md" px={40} py={60} mt={30} radius="md">
          <Title ta="center" fw={900}>
            Tekrar Hoşgeldin
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5} mb={rem(40)}>
            Uygulamayı kullanmaya başlamak için giriş yap!
          </Text>
          {login.error?.response?.status === 401 && (
            <Alert variant="light" color="red.7" icon={<IconAlertTriangle size={32} />} mb={rem(20)}>
              Kullanıcı adı veya şifre hatalı!
            </Alert>
          )}
          <form onSubmit={form.onSubmit((data) => login.mutate(data))}>
            <TextInput
              label="Kullanıcı Adı"
              placeholder="tire_ins"
              leftSection={<IconUser size={16} />}
              key={form.key('username')}
              {...form.getInputProps('username')}
            />
            <PasswordInput
              label="Şifre"
              placeholder="*********"
              mt="md"
              leftSection={<IconLock size={16} />}
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <Button fullWidth mt="xl" loading={login.isLoading || isRouterLoading} type="submit">
              Giriş
            </Button>
          </form>
        </Paper>
      </Container>
    </Flex>
  );
}
