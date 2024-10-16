import { AppShell, Burger, Group, ScrollArea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Navbar } from 'src/components/Shared/Nav/Navbar';
import UserInfo from 'src/components/Shared/Nav/UserInfo';
import Brand from 'src/components/canverse-logo';
import ToggleColorSchemeButton from 'src/components/toggle-color-scheme-button';

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
      layout="alt"
      padding="xl"
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      styles={{
        header: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0),var(--mantine-color-dark-7))',
          borderBottom: '1px solid light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-5))'
        },
        navbar: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0),var(--mantine-color-dark-7))',
          borderRight: '1px solid light-dark(var(--mantine-color-gray-2),var(--mantine-color-dark-5))'
        },
        main: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-1),var(--mantine-color-dark-8))'
        }
      }}>
      <AppShell.Header>
        <Group h="100%" align="center" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ToggleColorSchemeButton ml="auto" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section h="64px">
          <Group h="100%" align="center" pl="1.5rem" gap="xs">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Brand />
            <Title size="20">Canverse</Title>
          </Group>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Navbar onLinkClick={toggle} />
        </AppShell.Section>
        <AppShell.Section>
          <UserInfo />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
