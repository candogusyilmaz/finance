import { ActionIcon, Text } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';
import { Fodal } from 'src/components/fodal';
import type {
  CurrencyResponse,
  PaymentCategoryResponse,
  ProductCategoryResponse,
  ProductUnitResponse,
  ProfessionResponse
} from '../-api/types';
import { UpdateProfessionForm } from '../-forms/update-profession-form';

export const PROFESSION_COLUMNS: ColumnDef<ProfessionResponse>[] = [
  {
    header: 'Meslek Adı',
    cell: ({ row }) => <Text size="sm">{row.original.name}</Text>
  },
  {
    accessorKey: 'actions',
    header: '',
    enableSorting: false,
    cell: ({ row }) => (
      <Fodal
        title="Meslek Güncelle"
        content={({ close }) => <UpdateProfessionForm onSuccess={close} professionId={row.original.id} />}
        trigger={({ open }) => (
          <ActionIcon onClick={open} size="sm" variant="subtle">
            <IconEdit size="100%" />
          </ActionIcon>
        )}
      />
    ),
    size: 20
  }
];

export const PAYMENT_CATEGORY_COLUMNS: ColumnDef<PaymentCategoryResponse>[] = [
  {
    header: 'Kategori Adı',
    cell: ({ row }) => <Text size="sm">{row.original.name}</Text>
  }
];

export const PRODUCT_CATEGORY_COLUMNS: ColumnDef<ProductCategoryResponse>[] = [
  {
    header: 'Kategori Adı',
    cell: ({ row }) => <Text size="sm">{row.original.name}</Text>
  }
];

export const PRODUCT_UNIT_COLUMNS: ColumnDef<ProductUnitResponse>[] = [
  {
    header: 'Ürün Birim Adı',
    cell: ({ row }) => <Text size="sm">{row.original.name}</Text>
  },
  {
    header: 'Sembol',
    cell: ({ row }) => <Text size="sm">{row.original.symbol}</Text>
  }
];

export const CURRENCY_COLUMNS: ColumnDef<CurrencyResponse>[] = [
  {
    header: 'Para Birimi',
    cell: ({ row }) => `${row.original.code} - ${row.original.name} - ${row.original.symbol}`
  },
  {
    header: 'Kur',
    cell: ({ row }) => row.original.exchangeRate
  },
  {
    header: 'Baz Para Birimi',
    cell: ({ row }) => (row.original.baseCurrency ? 'Evet' : 'Hayır')
  },
  {
    header: 'Fatura Para Birimi',
    cell: ({ row }) => (row.original.invoiceCurrency ? 'Evet' : 'Hayır')
  }
];
