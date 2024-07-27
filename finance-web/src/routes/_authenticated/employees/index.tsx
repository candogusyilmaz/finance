import { Group, Stack } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import CreateEmployeeModal from './-components/CreateEmployeeModal';
import EmployeesTable from './-components/EmployeesTable';

export const Route = createFileRoute('/_authenticated/employees/')({
  component: Employees,
  validateSearch: PageSchema
});

function Employees() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center">
        <RouteTitle>Personeller</RouteTitle>
        <CreateEmployeeModal />
      </Group>
      <EmployeesTable />
    </Stack>
  );
}
