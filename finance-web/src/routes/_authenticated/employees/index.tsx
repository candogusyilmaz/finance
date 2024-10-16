import { Group, Stack } from '@mantine/core';
import { IconId } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import { EmployeesTable } from 'src/features/employees/list/components/employees-table';
import { CreateEmployeeModalButton } from 'src/features/employees/list/modals/create-employee-modal';

export const Route = createFileRoute('/_authenticated/employees/')({
  component: Employees,
  validateSearch: PageSchema
});

function Employees() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center" mb="lg">
        <IconId size={36} />
        <RouteTitle title="Personeller" />
      </Group>
      <Stack>
        <Group justify="flex-end">
          <CreateEmployeeModalButton />
        </Group>
        <EmployeesTable />
      </Stack>
    </Stack>
  );
}
