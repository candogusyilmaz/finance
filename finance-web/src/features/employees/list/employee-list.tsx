import { Group, Stack } from '@mantine/core';
import { IconId } from '@tabler/icons-react';
import { RouteTitle } from 'src/components/ui/route-title';
import { EmployeesTable } from './components/employees-table';
import { CreateEmployeeModalButton } from './modals/create-employee-modal';

export function EmployeeList() {
  return (
    <>
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
    </>
  );
}
