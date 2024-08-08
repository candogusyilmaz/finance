import { Checkbox, Text } from '@mantine/core';
import { getRouteApi } from '@tanstack/react-router';
import { useDataTableColumns } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetPurchasesResponse } from 'src/api/types/PurchaseTypes';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { Tooltippable } from 'src/components/Shared/Tooptippable';
import { FormatDateTime, FormatPrice } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/purchases/');

export default function PurchasesTable() {
  const { page, sort, size, supplierId } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['purchases', pageable, supplierId],
    queryFn: async () => (await api.get<Page<GetPurchasesResponse>>(createURL('/purchases', pageable, { supplierId }))).data,
    cacheTime: 120000,
    staleTime: 120000
  });

  const { effectiveColumns } = useDataTableColumns<GetPurchasesResponse>({
    key: 'purchases',
    columns: [
      { accessor: 'id', title: 'ID', sortable: true },
      { accessor: 'worksite.name', title: 'Çalışma Yeri', sortable: true, render: (record) => record.worksite.name, ellipsis: true },
      { accessor: 'supplier.name', title: 'Tedarikçi', sortable: true, render: (record) => record.supplier.name },
      { accessor: 'description', title: 'Aciklama' },
      { accessor: 'purchaseDate', title: 'Tarih', render: (record) => FormatDateTime(record.purchaseDate) },
      { accessor: 'official', title: 'Resmi', render: (record) => <Checkbox readOnly checked={record.official} /> },
      { accessor: 'total', title: 'Tutar', render: (record) => `${FormatPrice(record.total)} ${record.currency.code}` },
      {
        accessor: 'lastAction.status',
        title: 'Durum',
        render: (record) => (
          <Tooltippable label={record.lastAction.comment}>
            <Text>{record.lastAction.status}</Text>
          </Tooltippable>
        )
      },
      { accessor: 'lastAction.createdAt', title: 'Guncellenme Tarihi', render: (record) => FormatDateTime(record.lastAction.createdAt) }
    ]
  });

  return (
    <PreconfiguredDataTable
      columns={effectiveColumns}
      records={query.data?.content}
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
    />
  );
}
