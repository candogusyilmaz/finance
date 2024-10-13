import { Stack, Text } from '@mantine/core';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type { ID } from 'src/api/types/Defaults';
import AutofetchingTable from 'src/components/AutofetchingTable/AutofetchingTable';
import { FormatDate, FormatDateTime, FormatPrice } from 'src/utils/formatter';
import type { GetEmployeeSalaryResponse } from '../types';

function EmployeeSalaryHistoryTable({ employeeId }: Readonly<{ employeeId: ID }>) {
  const columns = useMemo<ColumnDef<GetEmployeeSalaryResponse>[]>(
    () => [
      {
        header: 'Ücret',
        cell: ({ row }) => <Text size="sm">{FormatPrice(row.original.wage, row.original.currency.code)}</Text>
      },
      {
        header: 'Etkin Dönem',
        cell: ({ row }) => (
          <Text size="sm">
            {FormatDate(row.original.effectivePeriod.startDate)} - {FormatDate(row.original.effectivePeriod.endDate)}
          </Text>
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

  return <AutofetchingTable columns={columns} fetchUrl={`/employees/${employeeId}/salaries`} />;
}

export default EmployeeSalaryHistoryTable;
