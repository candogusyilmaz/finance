import { IconEye } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { type DataTableSortStatus, useDataTableColumns } from 'mantine-datatable';
import { useCallback } from 'react';
import type { GetEmployeesResponse } from 'src/api/types/EmployeeTypes';
import { PreconfiguredDataTable } from 'src/components/preconfigured-data-table';
import { ActionIconLink } from 'src/components/ui/action-icon-link';
import { FormatDate } from 'src/utils/formatter';
import { getEmployeesQueryOptions } from '../queries/employee-list-queries';

const route = getRouteApi('/_authenticated/employees/');

export function EmployeesTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery(getEmployeesQueryOptions(pageable));

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
      },
      {
        accessor: 'actions',
        title: '',
        cellsStyle: () => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }),
        render: (record) => (
          <ActionIconLink size="sm" variant="subtle" to="/employees/$employeeId" params={{ employeeId: record.id.toString() }}>
            <IconEye size="100%" />
          </ActionIconLink>
        )
      }
    ]
  });

  const onSortStatusChange = useCallback(
    (s: DataTableSortStatus<GetEmployeesResponse>) =>
      navigate({
        search: (prev) => ({
          ...prev,
          sort: { id: s.columnAccessor, direction: s.direction }
        })
      }),
    [navigate]
  );

  const onPageChange = useCallback(
    (p: number) =>
      navigate({
        search: (prev) => ({ ...prev, page: p })
      }),
    [navigate]
  );

  return (
    <PreconfiguredDataTable
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
