import { Badge, Stack, Text } from '@mantine/core';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ID } from 'src/api/types/Defaults';
import AutofetchingTable from 'src/components/AutofetchingTable/AutofetchingTable';
import { StatusColorMap } from 'src/utils/color-helper';
import { FormatDate, FormatDateTime, FormatPrice } from 'src/utils/formatter';
import type { GetEmployeePaymentResponse } from '../types';

function EmployeePaymentHistoryTable({ employeeId }: Readonly<{ employeeId: ID }>) {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<GetEmployeePaymentResponse>[]>(
    () => [
      {
        header: 'Taraf',
        cell: ({ row }) => {
          const { toParty, fromParty } = row.original;
          const isToParty = toParty.id.toString() === employeeId;

          return <Text size="sm">{isToParty ? fromParty.name : toParty.name}</Text>;
        }
      },
      {
        header: 'Tarih',
        cell: ({ row }) => <Text size="sm">{FormatDate(row.original.date)}</Text>
      },
      {
        header: 'Tutar',
        cell: ({ row }) => {
          const { toParty, money } = row.original;
          const isToParty = toParty.id.toString() === employeeId;
          const color = isToParty ? 'green.6' : 'red.5';

          return (
            <Text size="sm" c={color}>
              {FormatPrice(money.amount, money.currencyCode)}
            </Text>
          );
        }
      },
      {
        header: 'Durum',
        cell: ({ row }) => (
          <Badge variant="dot" tt="capitalize" color={StatusColorMap[row.original.status.status]}>
            {t(row.original.status.status)}
          </Badge>
        )
      },
      {
        header: 'Denetim Bilgisi',
        cell: ({ row }) => (
          <Stack gap={0}>
            <Text size="sm" c="dark.0">
              {row.original.status.audit.name}
            </Text>
            <Text size="xs" c="dimmed">
              {FormatDateTime(row.original.status.audit.time, {
                dateStyle: 'medium'
              })}
            </Text>
          </Stack>
        )
      }
    ],
    [t, employeeId]
  );

  return <AutofetchingTable columns={columns} fetchUrl={`/employees/${employeeId}/payments`} />;
}

export default EmployeePaymentHistoryTable;
