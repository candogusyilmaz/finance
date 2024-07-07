import { Group, Stack } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { RouteTitle } from 'src/components/RouteTitle';
import CompaniesTable from 'src/routes/_authenticated/companies/-(components)/CompaniesTable';
import CreateCompanyModal from 'src/routes/_authenticated/companies/-(components)/CreateCompanyModal';

export const Route = createFileRoute('/_authenticated/companies/')({
  component: Companies
});

function Companies() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center">
        <RouteTitle>Şirketler</RouteTitle>
        <CreateCompanyModal />
      </Group>
      <CompaniesTable />
    </Stack>
  );
}
