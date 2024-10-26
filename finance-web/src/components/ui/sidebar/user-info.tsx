import { ActionIcon, Avatar, Group, Stack, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useAuth } from 'src/utils/auth';
import classes from './user-info.module.css';

export function UserInfo() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await router.invalidate();
    await navigate({ to: '/login' });
  };

  return (
    <Group className={classes.wrapper} wrap="nowrap" gap="xs">
      <Avatar variant="white" size={42} name={user?.displayName} color="initials" />
      <Stack gap={0} w={135}>
        <Text size="sm">{user?.displayName}</Text>
        <Text size="xs" c="dimmed" truncate="end" fw={500}>
          Software Developer
        </Text>
      </Stack>
      <ActionIcon className={classes.logout} variant="subtle" ml="auto" h={30} w={30} radius="sm" onClick={handleLogout}>
        <IconLogout size={18} />
      </ActionIcon>
    </Group>
  );
}
