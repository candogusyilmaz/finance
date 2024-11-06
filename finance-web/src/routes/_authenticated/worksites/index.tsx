import { Group, Stack } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/ui/route-title';
import { CreateWorksiteModal } from './-components/CreateWorksiteModal';
import { WorksitesTable } from './-components/WorksitesTable';

export const Route = createFileRoute('/_authenticated/worksites/')({
  component: Worksites,
  validateSearch: PageSchema
});

function Worksites() {
  return (
    <>
      <Group align="center" mb="xl">
        <IconBuildingFactory2 size={36} />
        <RouteTitle title="Çalışma Yerleri" />
      </Group>
      <Stack>
        <Group justify="flex-end">
          <CreateWorksiteModal />
        </Group>
        <WorksitesTable />
      </Stack>
    </>
  );
}
