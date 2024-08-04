import { Group, Stack } from '@mantine/core';
import { IconBuildingCommunity } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import CompaniesTable from 'src/routes/_authenticated/companies/-components/CompaniesTable';
import CreateCompanyModal from 'src/routes/_authenticated/companies/-components/CreateCompanyModal';

export const Route = createFileRoute('/_authenticated/companies/')({
  component: Companies
});

function Companies() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center" mb="lg">
        <IconBuildingCommunity size={36} />
        <RouteTitle title="Şirketler" />
      </Group>
      <Stack>
        <Group justify="flex-end">
          <CreateCompanyModal />
        </Group>
        <CompaniesTable />
      </Stack>
    </Stack>
  );
}
