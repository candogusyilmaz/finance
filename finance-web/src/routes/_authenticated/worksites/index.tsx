import { Group, Stack } from '@mantine/core';
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
      <Group align="center">
        <RouteTitle>Çalışma Yeri</RouteTitle>
        <CreateWorksiteModal />
      </Group>
      <WorksitesTable />
    </Stack>
  );
}
