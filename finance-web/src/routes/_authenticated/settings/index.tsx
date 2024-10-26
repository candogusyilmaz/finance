import { Group } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import { Settings } from 'src/features/settings/settings';

export const Route = createFileRoute('/_authenticated/settings/')({
  component: Layout
});

function Layout() {
  return (
    <>
      <Helmet>
        <title>Ayarlar | Canverse</title>
      </Helmet>
      <Group align="center" mb="lg" gap="xs">
        <IconSettings size={36} />
        <RouteTitle title="Ayarlar" />
      </Group>
      <Settings />
    </>
  );
}
