import { AppShell, Burger, Group, ScrollArea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type React from 'react';
import { Brand } from 'src/components/ui/canverse-logo';
import { Sidebar } from 'src/components/ui/sidebar/sidebar';
import { ToggleColorSchemeButton } from 'src/components/ui/toggle-color-scheme-button';
import { UserInfo } from 'src/components/ui/user-info/user-info';

import classes from './authenticated-layout.module.css';

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      padding="xl"
      header={{ height: 64 }}
      navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      className={classes.shell}>
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
          <Sidebar onLinkClick={toggle} />
        </AppShell.Section>
        <AppShell.Section>
          <UserInfo />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
