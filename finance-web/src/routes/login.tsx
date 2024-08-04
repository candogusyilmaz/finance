import { Button, Container, Flex, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconLock, IconUser } from '@tabler/icons-react';
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
  beforeLoad: ({ context, search }) => {
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
      console.log(search.redirect);
      await auth.login(data);
      await navigate({ to: search.redirect ?? '/dashboard' });
      await router.invalidate();
    },
    onError(error: ApiError) {
      if (error.response?.status === 401) {
        notifications.show({
          message: 'Kullanıcı adı veya şifre hatalı!',
          color: 'red'
        });
      }
      form.reset();
    }
  });

  return (
    <Flex justify="center" align="center" h="100%">
      <Container size={420} w={600}>
        <Title ta="center" fw={900}>
          Tekrar Hoşgeldin
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Uygulamayı kullanmaya başlamak için giriş yap!
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
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
