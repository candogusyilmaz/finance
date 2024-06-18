import { rem } from '@mantine/core';
import { getRouteApi } from '@tanstack/react-router';
import { DataTable, type DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { createURL, type Page } from 'src/api/types/Defaults';
import type { GetProductsResponse } from 'src/api/types/ProductTypes';
import { FormatDateTime } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/products/$productId');

export default function ProductWarehousesTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['products', pageable],
    queryFn: async () =>
      (
        await api.get<Page<GetProductsResponse>>(
          createURL('/products', pageable)
        )
      ).data,
    cacheTime: 120000
  });

  const columns: DataTableColumn<GetProductsResponse>[] = [
    { accessor: 'name', title: 'Ürün', sortable: true },
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
  const [selectedRecords, setSelectedRecords] = useState<GetProductsResponse[]>(
    []
  );

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
