import { getRouteApi } from '@tanstack/react-router';
import { useDataTableColumns } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetEmployeesResponse } from 'src/api/types/EmployeeTypes';
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
        accessor: 'em.organization.name',
        title: 'Organizasyon',
        sortable: true,
        render: (record) => record.currentOrganization?.name
      },
      {
        accessor: 'socialSecurityNumber',
        title: 'Kimlik Numarası',
        render: (record) => record.socialSecurityNumber
      },
      {
        accessor: 'name',
        title: 'Personel',
        render: (record) => record.name
      },
      {
        accessor: 'ea.worksite.name',
        title: 'Çalışma Yeri',
        sortable: true,
        render: (record) => record.currentWorksite?.name
      },
      {
        accessor: 'currentOrganization.formalEmploymentPeriod.startDate',
        title: 'Resmi İşe Başlama Tarihi',
        render: (record) => FormatDate(record.currentOrganization?.formalEmploymentPeriod.startDate)
      },
      {
        accessor: 'currentOrganization.formalEmploymentPeriod.endDate',
        title: 'Resmi İşten Ayrılma Tarihi',
        render: (record) => FormatDate(record.currentOrganization?.formalEmploymentPeriod.endDate)
      },
      {
        accessor: 'currentOrganization.actualEmploymentPeriod.startDate',
        title: 'İşe Başlama Tarihi',
        render: (record) => FormatDate(record.currentOrganization?.actualEmploymentPeriod.startDate)
      },
      {
        accessor: 'currentOrganization.actualformalEmploymentPeriod.endDate',
        title: 'İşten Ayrılma Tarihi',
        render: (record) => FormatDate(record.currentOrganization?.actualEmploymentPeriod.endDate)
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
      onRowDoubleClick={({ record }) =>
        navigate({
          to: '/employees/$employeeId',
          params: { employeeId: record.id.toString() }
        })
      }
    />
  );
}
