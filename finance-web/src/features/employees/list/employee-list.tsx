import { Group, ScrollArea, Stack, rem, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconId } from '@tabler/icons-react';
import { Frawer } from 'src/components/frawer';
import { CreateButton } from 'src/components/ui/predefined-buttons';
import { RouteTitle } from 'src/components/ui/route-title';
import { EmployeesTable } from './components/employees-table';
import { CreateEmployeeForm } from './forms/create-employee-form';

export function EmployeeList() {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  return (
    <>
      <Group align="center" mb="lg">
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
    </>
  );
}
