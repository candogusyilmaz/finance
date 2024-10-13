import { Button, Center, Divider, Paper, type PaperProps, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconLock, IconUser } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi, useRouter } from '@tanstack/react-router';
import { api } from 'src/api/axios';
import type { CreateAccessTokenRequest, CreateAccessTokenResponse } from 'src/api/types/TokenTypes';
import ToggleColorSchemeButton from 'src/components/ToggleColorSchemeButton';
import { useAuth } from 'src/utils/auth';

const Route = getRouteApi('/login');

function Login(props: PaperProps) {
  const auth = useAuth();
  const router = useRouter();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: ''
    },
    validate: {
      username: (val: string) => (val.length <= 2 ? 'En az 3 karakter olmalıdır' : null),
      password: (val: string) => (val.length <= 2 ? 'En az 3 karakter olmalıdır' : null)
    }
  });

  const login = useMutation({
    mutationFn: async (data: CreateAccessTokenRequest) => (await api.post<CreateAccessTokenResponse>('/auth/token', data)).data,
    onSuccess: async (data) => {
      await auth.login(data);
      await new Promise((r) => setTimeout(r, 1));
      await navigate({ to: search.redirect ?? '/' });
      await router.invalidate();
    },
    onError: () => {
      form.reset();
      form.getInputNode('username')?.focus();
      form.setErrors({
        username: true,
        password: true
      });
    }
  });

  return (
    <Paper radius="md" p="xl" {...props}>
      <ToggleColorSchemeButton pos="absolute" top={0} right={0} m={20} />
      <Center>
        <Title>Canverse</Title>
      </Center>

      <Divider label="Devam etmek için giriş yapın" labelPosition="center" my="lg" />
      <form
        onSubmit={form.onSubmit(
          (data: CreateAccessTokenRequest) => login.mutate(data),
          (errors) => {
            const firstErrorPath = Object.keys(errors)[0];
            form.getInputNode(firstErrorPath)?.focus();
          }
        )}>
        <TextInput
          label="Kullanıcı Adı"
          placeholder="canverse"
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
        <Button fullWidth mt="xl" loading={login.isPending} disabled={login.isSuccess} type="submit">
          Giriş
        </Button>
      </form>
    </Paper>
  );
}

export default Login;
