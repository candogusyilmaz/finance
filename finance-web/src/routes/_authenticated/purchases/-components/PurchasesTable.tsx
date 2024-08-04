import { Checkbox, Text, Tooltip } from '@mantine/core';
import { getRouteApi } from '@tanstack/react-router';
import { useDataTableColumns } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetPurchasesView } from 'src/api/types/PurchaseTypes';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { FormatDateTime, FormatPrice } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/purchases/');

export default function PurchasesTable() {
  const { page, sort, size, companyId } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['purchases', pageable, companyId],
    queryFn: async () => (await api.get<Page<GetPurchasesView>>(createURL('/purchases', pageable, { companyId }))).data,
    cacheTime: 120000,
    staleTime: 120000
  });

  const { effectiveColumns } = useDataTableColumns<GetPurchasesView>({
    key: 'purchases',
    columns: [
      { accessor: 'id', title: 'ID', sortable: true },
      { accessor: 'company.name', title: 'Satıcı', sortable: true, render: (record) => record.company?.name },
      { accessor: 'description', title: 'Aciklama' },
      { accessor: 'purchaseDate', title: 'Tarih', render: (record) => FormatDateTime(record.purchaseDate) },
      { accessor: 'official', title: 'Resmi', render: (record) => <Checkbox readOnly checked={record.official} /> },
      { accessor: 'total', title: 'Tutar', render: (record) => `${FormatPrice(record.total)} ${record.currency.code}` },
      {
        accessor: 'lastAction.status',
        title: 'Durum',
        render: (record) => (
          <Tooltip label={record.lastAction.comment ?? ''}>
            <Text>{record.lastAction.status}</Text>
          </Tooltip>
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
