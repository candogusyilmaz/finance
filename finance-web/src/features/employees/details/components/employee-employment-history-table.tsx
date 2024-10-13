import { Stack, Text } from '@mantine/core';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type { ID } from 'src/api/types/Defaults';
import AutofetchingTable from 'src/components/AutofetchingTable/AutofetchingTable';
import { FormatDate, FormatDateTime } from 'src/utils/formatter';
import type { GetEmployeeEmploymentResponse } from '../types';

function EmployeeEmploymentHistoryTable({ employeeId }: Readonly<{ employeeId: ID }>) {
  const columns = useMemo<ColumnDef<GetEmployeeEmploymentResponse>[]>(
    () => [
      {
        header: 'Organizasyon',
        cell: ({ row }) => <Text size="sm">{row.original.organization.name}</Text>
      },
      {
        header: 'Gerçek Çalışma Dönemi',
        cell: ({ row }) => (
          <Stack gap={0}>
            <Text size="sm">{FormatDate(row.original.actualEmploymentPeriod.startDate)}</Text>
            <Text size="sm">{FormatDate(row.original.actualEmploymentPeriod.endDate, { fallbackValue: '-' })}</Text>
          </Stack>
        )
      },
      {
        header: 'Resmi Çalışma Dönemi',
        cell: ({ row }) => (
          <Stack gap={0}>
            <Text size="sm">{FormatDate(row.original.formalEmploymentPeriod.startDate)}</Text>
            <Text size="sm">{FormatDate(row.original.formalEmploymentPeriod.endDate, { fallbackValue: '-' })}</Text>
          </Stack>
        )
      },
      {
        header: 'Oluşturan',
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
        header: 'Son Güncelleyen',
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

  return <AutofetchingTable columns={columns} fetchUrl={`/employees/${employeeId}/employments`} />;
}

export default EmployeeEmploymentHistoryTable;
