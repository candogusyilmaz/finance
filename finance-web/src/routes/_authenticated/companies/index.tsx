import { Group, Stack, Text, rem } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import CompaniesTable from 'src/routes/_authenticated/companies/-(components)/CompaniesTable';
import CreateCompanyModal from 'src/routes/_authenticated/companies/-(components)/CreateCompanyModal';

export const Route = createFileRoute('/_authenticated/companies/')({
  component: Companies
});

function Companies() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Text>Top Nav Bar</Text>
      <Group align="center">
        <Text pl={rem(8)} size={rem(32)} w={rem(200)}>
          Şirketler
        </Text>
        <CreateCompanyModal />
      </Group>
      <CompaniesTable />
    </Stack>
  );
}
