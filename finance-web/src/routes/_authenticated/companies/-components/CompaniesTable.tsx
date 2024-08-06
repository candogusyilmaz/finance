import { Group } from '@mantine/core';
import { getRouteApi } from '@tanstack/react-router';
import type { DataTableColumn } from 'mantine-datatable';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import type { GetCompaniesResponse } from 'src/api/types/CompanyTypes';
import { type Page, createURL } from 'src/api/types/Defaults';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { FormatDateTime } from 'src/utils/formatter';
import DeleteCompanyModal from './DeleteCompanyModal';

const route = getRouteApi('/_authenticated/companies/');

export default function CompaniesTable() {
  const { page, sort, size } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['companies', pageable],
    queryFn: async () => {
      return (await api.get<Page<GetCompaniesResponse>>(createURL('/companies', pageable))).data;
    },
    cacheTime: 6000
  });

  const columns: DataTableColumn<GetCompaniesResponse>[] = [
    { accessor: 'name', title: 'Şirket', sortable: true },
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
    },
    {
      accessor: 'actions',
      title: '',
      render: (company) => (
        <Group gap={4} justify="right" wrap="nowrap">
          <DeleteCompanyModal id={company.id} name={company.name} />
        </Group>
      )
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
      totalRecords={query.data?.totalElements}
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
