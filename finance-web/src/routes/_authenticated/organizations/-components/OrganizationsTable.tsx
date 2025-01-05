import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import type { DataTableColumn } from 'mantine-datatable';
import { api } from 'src/api/axios';
import type { GetOrganizationsResponse } from 'src/api/types/OrganizationTypes';
import { PreconfiguredDataTable } from 'src/components/preconfigured-data-table';
import { FormatDateTime } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/organizations/');

export function OrganizationsTable() {
  const { role } = route.useSearch();

  const query = useQuery({
    queryKey: ['organizations', role],
    queryFn: async () => {
      return (
        await api.get<GetOrganizationsResponse[]>('/organizations', {
          params: { role }
        })
      ).data;
    }
  });

  const columns: DataTableColumn<GetOrganizationsResponse>[] = [
    { accessor: 'name', title: 'İsim' },
    {
      accessor: 'phoneNumber',
      title: 'Telefon'
    },
    { accessor: 'taxOffice', title: 'Vergi Dairesi' },
    { accessor: 'taxRegistrationNumber', title: 'Vergi Numarası' },
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

  return <PreconfiguredDataTable columns={columns} records={query.data} fetching={query.isFetching} />;
}
