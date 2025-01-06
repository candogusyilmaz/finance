import { Group, ScrollArea, Stack, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconId } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';
import { PageSchema } from 'src/api/types/Defaults';
import { Frawer } from 'src/components/frawer';
import { CreateButton } from 'src/components/ui/predefined-buttons';
import { RouteTitle } from 'src/components/ui/route-title';
import { EmployeesTable } from './-components/employees-table';
import { CreateEmployeeForm } from './-forms/create-employee-form';

export const Route = createFileRoute('/_authenticated/employees/')({
  component: Employees,
  validateSearch: PageSchema
});

function Employees() {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <Fragment>
      <Group align="center" mb="xl">
        <IconId size={36} />
        <RouteTitle title="Personeller" />
      </Group>
      <Stack>
        <Group justify="flex-end">
          <Frawer
            title="Yeni Personel Bilgileri"
            content={({ close }) => <CreateEmployeeForm onSuccess={close} />}
            trigger={({ open }) => (
              <CreateButton w={matches ? '100%' : 'initial'} onClick={open}>
                Yeni personel oluştur
              </CreateButton>
            )}
            drawerProps={{
              offset: 12,
              position: 'right',
              radius: 'sm',
              scrollAreaComponent: ScrollArea.Autosize,
              size: rem(475)
            }}
          />
        </Group>
        <EmployeesTable />
      </Stack>
    </Fragment>
  );
}
