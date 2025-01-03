import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useDataTableColumns } from 'mantine-datatable';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import { PreconfiguredDataTable } from 'src/components/preconfigured-data-table';

const route = getRouteApi('/_authenticated/worksites/');

export function WorksitesTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['worksites', pageable],
    queryFn: async () => (await api.get<Page<GetWorksitesResponse>>(createURL('/worksites', pageable))).data,
    staleTime: 120000
  });

  const { effectiveColumns } = useDataTableColumns<GetWorksitesResponse>({
    key: 'worksites',
    columns: [
      { accessor: 'organization.name', title: 'Organizasyon', sortable: true },
      { accessor: 'name', title: 'Çalışma Yeri', sortable: true },
      {
        accessor: 'currentSupervisor.supervisor.name',
        title: 'Denetleyici',
        sortable: true,
        render: (record) => record.supervisor?.name
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
      totalRecords={query.data?.page.totalElements}
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
