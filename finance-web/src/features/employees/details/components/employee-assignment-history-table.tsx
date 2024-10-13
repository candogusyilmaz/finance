import { Stack, Text } from '@mantine/core';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type { ID } from 'src/api/types/Defaults';
import AutofetchingTable from 'src/components/AutofetchingTable/AutofetchingTable';
import { FormatDate, FormatDateTime } from 'src/utils/formatter';
import type { GetEmployeeAssignmentResponse } from '../types';

function EmployeeAssignmentHistoryTable({ employeeId }: Readonly<{ employeeId: ID }>) {
  const columns = useMemo<ColumnDef<GetEmployeeAssignmentResponse>[]>(
    () => [
      {
        header: 'Çalışma Yeri',
        accessorKey: 'worksite.name',
        cell: ({ row }) => <Text size="sm">{row.original.worksite.name}</Text>
      },
      {
        header: 'Dönem',
        cell: ({ row }) => (
          <Stack gap={0}>
            <Text size="sm">{FormatDate(row.original.period.startDate)}</Text>
            <Text size="sm">{FormatDate(row.original.period.endDate, { fallbackValue: '-' })}</Text>
          </Stack>
        )
      },
      {
        header: 'Oluşturulma',
        cell: ({ row }) => (
          <Stack gap={0}>
            <Text size="sm">{row.original.createdBy.name}</Text>
            <Text size="xs" c="dimmed">
              {FormatDateTime(row.original.createdBy.time, { dateStyle: 'medium' })}
            </Text>
          </Stack>
        )
      },
      {
        header: 'Son Güncelleme',
        cell: ({ row }) => (
          <Stack gap={0}>
            <Text size="sm">{row.original.updatedBy.name}</Text>
            <Text size="xs" c="dimmed">
              {FormatDateTime(row.original.updatedBy.time, { dateStyle: 'medium' })}
            </Text>
          </Stack>
        )
      }
    ],
    []
  );

  return <AutofetchingTable columns={columns} fetchUrl={`/employees/${employeeId}/assignments`} />;
}

export default EmployeeAssignmentHistoryTable;
