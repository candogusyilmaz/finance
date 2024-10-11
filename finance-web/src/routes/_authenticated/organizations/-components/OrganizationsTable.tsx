import { getRouteApi } from '@tanstack/react-router';
import type { DataTableColumn } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetOrganizationsResponse } from 'src/api/types/OrganizationTypes';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { FormatDateTime } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/organizations/');

export default function OrganizationsTable() {
  const { page, sort, size, role } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['organizations', pageable, role],
    queryFn: async () => {
      return (await api.get<Page<GetOrganizationsResponse>>(createURL('/organizations', pageable, { role }))).data;
    },
    cacheTime: 6000
  });

  const columns: DataTableColumn<GetOrganizationsResponse>[] = [
    { accessor: 'name', title: 'İsim', sortable: true },
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

  return (
    <PreconfiguredDataTable
      columns={columns}
      records={query.data?.content}
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
      recordsPerPage={20}
      page={page}
      onPageChange={(p) =>
        navigate({
          search: (prev) => ({ ...prev, page: p })
        })
      }
      fetching={query.isFetching}
    />
  );
}
