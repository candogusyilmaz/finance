import { Alert, Box, Button, Flex, Paper, PasswordInput, TextInput, Title, rem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconAlertTriangle, IconLock, IconUser } from '@tabler/icons-react';
import { createFileRoute, redirect, useRouter, useRouterState } from '@tanstack/react-router';
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
    <>
      <Box
        style={{ zIndex: -1, filter: 'blur(13px)', WebkitFilter: 'blur(13px)', msFilter: 'blur(13px)' }}
        pos="fixed"
        left={0}
        right={0}
        h="100%"
        bgsz="cover"
        bg="url('/assets/login-bg.jpg')"
      />
      <Flex justify="center" align="center" h="100dvh">
        <Paper withBorder shadow="xl" w={425} px={40} py={40} radius="xs">
          <Title fz={28} fw={500} mb={25}>
            Giriş
          </Title>
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
              mb={20}
            />
            <PasswordInput
              label="Şifre"
              placeholder="*********"
              mt="md"
              leftSection={<IconLock size={16} />}
              key={form.key('password')}
              {...form.getInputProps('password')}
              mb={40}
            />
            <Button fullWidth mt="xl" loading={login.isLoading || isRouterLoading} type="submit">
              Giriş
            </Button>
          </form>
        </Paper>
      </Flex>
    </>
  );
}
