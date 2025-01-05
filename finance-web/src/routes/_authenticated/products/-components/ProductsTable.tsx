import { Center } from '@mantine/core';
import { IconClick, IconEye } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { type DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
import { useCallback } from 'react';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetProductsResponse } from 'src/api/types/ProductTypes';
import { PreconfiguredDataTable } from 'src/components/preconfigured-data-table';
import { ActionIconLink } from 'src/components/ui/action-icon-link';
import { FormatDateTime } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/products/');

export function ProductsTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['products', pageable],
    queryFn: async () => (await api.get<Page<GetProductsResponse>>(createURL('/products', pageable))).data
  });

  const { effectiveColumns } = useDataTableColumns<GetProductsResponse>({
    key: 'products',
    columns: [
      { accessor: 'name', title: 'Ürün', sortable: true },
      {
        accessor: 'type',
        title: 'Ürün Tipi',
        sortable: true,
        render: (record) => (record.type === 'PRODUCT' ? 'Ürün' : 'Hizmet')
      },
      { accessor: 'category.name', title: 'Kategori', sortable: true },
      { accessor: 'unit.name', title: 'Birim' },
      { accessor: 'description', title: 'Açıklama' },
      {
        accessor: 'createdAt',
        title: 'Oluşturulma Tarihi',
        render: (record) => FormatDateTime(record.createdAt)
      },
      {
        accessor: 'updatedAt',
        title: 'Son Güncelleme Tarihi',
        render: (record) => FormatDateTime(record.updatedAt)
      },
      {
        accessor: 'actions',
        title: (
          <Center>
            <IconClick size={16} />
          </Center>
        ),

        width: '0%',
        render: (record) => (
          <Center>
            <ActionIconLink
              size="sm"
              variant="subtle"
              to="/products/$productId"
              params={{ productId: record.id.toString() }}
              search={{
                page: 1,
                size: 20,
                sort: { id: 'id', direction: 'asc' },
                tab: 'prices'
              }}>
              <IconEye size="100%" />
            </ActionIconLink>
          </Center>
        )
      }
    ]
  });

  const onSortStatusChange = useCallback(
    (s: DataTableSortStatus<GetProductsResponse>) =>
      navigate({
        search: {
          sort: { id: s.columnAccessor, direction: s.direction }
        }
      }),
    [navigate]
  );

  const onPageChange = useCallback(
    (p: number) =>
      navigate({
        search: { page: p }
      }),
    [navigate]
  );

  return (
    <PreconfiguredDataTable
      pinLastColumn
      columns={effectiveColumns}
      records={query.data?.content}
      fetching={query.isFetching}
      sortStatus={{ columnAccessor: sort.id, direction: sort.direction }}
      onSortStatusChange={onSortStatusChange}
      totalRecords={query.data?.page.totalElements}
      recordsPerPage={size}
      page={page}
      onPageChange={onPageChange}
    />
  );
}
