import { Badge, Stack, Text } from '@mantine/core';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import type { ID } from 'src/api/types/Defaults';
import { StatusColorMap } from 'src/utils/color-helper';
import { FormatDate, FormatDateTime, FormatPrice } from 'src/utils/formatter';
import type {
  GetEmployeeAssignmentResponse,
  GetEmployeeEmploymentResponse,
  GetEmployeePaymentResponse,
  GetEmployeeSalaryResponse
} from '../-api/types';

export const EMPLOYEE_ASSIGNMENT_COLUMNS: ColumnDef<GetEmployeeAssignmentResponse>[] = [
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
];

export const EMPLOYEE_EMPLOYMENT_COLUMNS: ColumnDef<GetEmployeeEmploymentResponse>[] = [
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
];

export const EMPLOYEE_SALAY_COLUMNS: ColumnDef<GetEmployeeSalaryResponse>[] = [
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
];

export const GET_EMPLOYEE_PAYMENT_COLUMNS = (t: (key: string) => string, employeeId: ID) =>
  useMemo<ColumnDef<GetEmployeePaymentResponse>[]>(
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
              {FormatDateTime(row.original.status.audit.time, { dateStyle: 'medium' })}
            </Text>
          </Stack>
        )
      }
    ],
    [t, employeeId]
  );
