import { rem } from '@mantine/core';
import { getRouteApi } from '@tanstack/react-router';
import { DataTable, type DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetProductsResponse } from 'src/api/types/ProductTypes';
import { FormatDateTime } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/products/');

export default function ProductsTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['products', pageable],
    queryFn: async () => (await api.get<Page<GetProductsResponse>>(createURL('/products', pageable))).data,
    cacheTime: 120000
  });

  const columns: DataTableColumn<GetProductsResponse>[] = [
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
    }
  ];
  const [selectedRecords, setSelectedRecords] = useState<GetProductsResponse[]>([]);

  return (
    <DataTable
      borderRadius="sm"
      withTableBorder
      striped
      highlightOnHover
      columns={columns}
      records={query.data?.content}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      fetching={query.isFetching}
      sortStatus={{ columnAccessor: sort.id, direction: sort.direction }}
      onSortStatusChange={(s) =>
        navigate({
          search: (prev) => ({
            ...prev,
            sort: { id: s.columnAccessor, direction: s.direction }
          })
        })
      }
      totalRecords={query.data?.totalElements}
      recordsPerPage={size}
      page={page}
      onPageChange={(p) =>
        navigate({
          search: (prev) => ({ ...prev, page: p })
        })
      }
      onRowDoubleClick={({ record }) =>
        navigate({
          to: '/products/$productId',
          params: { productId: record.id },
          search: {
            page: 1,
            size: 20,
            sort: { id: 'id', direction: 'asc' },
            tab: 'prices'
          }
        })
      }
      defaultColumnProps={{
        cellsStyle: () => ({
          paddingTop: rem(12),
          paddingBottom: rem(12),
          fontSize: rem(14)
        })
      }}
    />
  );
}