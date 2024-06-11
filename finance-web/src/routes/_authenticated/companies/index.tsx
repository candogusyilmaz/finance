import { Group, Stack, Text, rem } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import CompaniesTable from './-(components)/CompaniesTable';
import CreateCompanyModal from './-(components)/CreateCompanyModal';

export const Route = createFileRoute('/_authenticated/companies/')({
  component: Companies
});

function Companies() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Text>Top Nav Bar</Text>
      <Group>
        <Text pl={rem(8)} size={rem(38)}>
          Sirketler
        </Text>
        <CreateCompanyModal />
      </Group>
      <CompaniesTable />
    </Stack>
  );
}
