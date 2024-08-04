import { getRouteApi } from '@tanstack/react-router';
import { useDataTableColumns } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { FormatDate } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/employees/');

export default function ProductsTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['employees', pageable],
    queryFn: async () => (await api.get<Page<GetEmployeesResponse>>(createURL('/employees', pageable))).data,
    cacheTime: 120000,
    staleTime: 120000
  });

  const { effectiveColumns } = useDataTableColumns<GetEmployeesResponse>({
    key: 'employees',
    columns: [
      {
        accessor: 'individual.socialSecurityNumber',
        title: 'Kimlik Numarası',
        sortable: true,
        ellipsis: true,
        resizable: true,
        render: (record) => record.socialSecurityNumber
      },
      {
        accessor: 'individual.firstName',
        title: 'Personel',
        sortable: true,
        render: (record) => record.fullname,
        ellipsis: true,
        resizable: true
      },
      {
        accessor: 'currentWorksite.id',
        title: 'Çalışma Yeri',
        sortable: true,
        render: (record) => record.worksite?.name,
        ellipsis: true,
        resizable: true
      },
      {
        accessor: 'officialEmploymentStartDate',
        title: 'Resmi İşe Başlama Tarihi',
        render: (record) => FormatDate(record.officialEmploymentStartDate),
        ellipsis: true,
        resizable: true
      },
      {
        accessor: 'officialEmploymentEndDate',
        title: 'Resmi İşten Ayrılma Tarihi',
        render: (record) => FormatDate(record.officialEmploymentEndDate),
        ellipsis: true,
        resizable: true
      },
      {
        accessor: 'employmentStartDate',
        title: 'İşe Başlama Tarihi',
        render: (record) => FormatDate(record.employmentStartDate),
        ellipsis: true,
        resizable: true
      },
      {
        accessor: 'employmentEndDate',
        title: 'İşten Ayrılma Tarihi',
        render: (record) => FormatDate(record.employmentEndDate),
        ellipsis: true,
        resizable: true
      }
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
