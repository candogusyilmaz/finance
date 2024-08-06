import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBuildingArch } from '@tabler/icons-react';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Navbar } from 'src/components/Shared/Nav/Navbar';

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
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="xl"
      header={{ height: 64 }}
      navbar={{ width: 255, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      styles={(theme) => ({
        header: {
          backgroundColor: theme.colors.dark[6]
        },
        navbar: {
          backgroundColor: theme.colors.dark[6]
        },
        main: {
          backgroundColor: theme.colors.dark[8]
        }
      })}>
      <AppShell.Header>
        <Group h="100%" align="center" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <IconBuildingArch size={36} />
          <Title size="28">Finance</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
