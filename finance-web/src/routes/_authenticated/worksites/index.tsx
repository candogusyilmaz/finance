import { Group, Stack } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import CreateWorksiteModal from './-components/CreateWorksiteModal';
import WorksitesTable from './-components/WorksitesTable';

export const Route = createFileRoute('/_authenticated/worksites/')({
  component: Worksites,
  validateSearch: PageSchema
});

function Worksites() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center" mb="lg">
        <IconBuildingFactory2 size={36} />
        <RouteTitle title="Çalışma Yerleri" />
      </Group>
      <Stack>
        <Group justify="flex-end">
          <CreateWorksiteModal />
        </Group>
        <WorksitesTable />
      </Stack>
    </Stack>
  );
}
