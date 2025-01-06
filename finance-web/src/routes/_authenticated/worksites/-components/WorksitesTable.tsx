import { useQuery } from '@tanstack/react-query';
import { useDataTableColumns } from 'mantine-datatable';
import { api } from 'src/api/axios';
import { PreconfiguredDataTable } from 'src/components/preconfigured-data-table';

export function WorksitesTable() {
  const query = useQuery({
    queryKey: ['worksites'],
    queryFn: async () => (await api.get<GetWorksitesResponse[]>('/worksites')).data,
    staleTime: 120000
  });

  const { effectiveColumns } = useDataTableColumns<GetWorksitesResponse>({
    key: 'worksites',
    columns: [
      { accessor: 'organization.name', title: 'Organizasyon' },
      { accessor: 'name', title: 'Çalışma Yeri' },
      {
        accessor: 'currentSupervisor.supervisor.name',
        title: 'Denetleyici',
        sortable: true,
        render: (record) => record.supervisor?.name
      }
    ]
  });

  return <PreconfiguredDataTable columns={effectiveColumns} records={query.data} fetching={query.isFetching} />;
}
