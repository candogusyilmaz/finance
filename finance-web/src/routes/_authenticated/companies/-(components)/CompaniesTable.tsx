import { Group, rem } from '@mantine/core';
import {
  DataTable,
  type DataTableColumn,
  type DataTableSortStatus
} from 'mantine-datatable';
import { useState } from 'react';
import { useGetCompanies } from 'src/api/Company';
import type { CompanyResponse } from 'src/api/types/CompanyTypes';
import DeleteCompanyModal from './DeleteCompanyModal';

const dateFormatter = (params: string) => {
  if (!params) {
    return '';
  }

  const date = new Date(params);
  return `${date.toLocaleString('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short'
  })}`;
};

export default function CompaniesTable() {
  const [page, setPage] = useState(0);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<CompanyResponse>
  >({
    columnAccessor: 'name',
    direction: 'asc'
  });
  const query = useGetCompanies({
    page: page,
    size: 20,
    sort: { id: sortStatus.columnAccessor, direction: sortStatus.direction }
  });

  const columns: DataTableColumn<CompanyResponse>[] = [
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
      render: (record) => dateFormatter(record.createdAt)
    },
    {
      accessor: 'updatedAt',
      title: 'Son Güncelleme Tarihi',
      render: (record) => dateFormatter(record.updatedAt)
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
  const [selectedRecords, setSelectedRecords] = useState<CompanyResponse[]>([]);

  return (
    <DataTable
      borderRadius="sm"
      withTableBorder
      striped
      highlightOnHover
      columns={columns}
      records={query.data?.content}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      totalRecords={query.data?.totalElements}
      recordsPerPage={20}
      page={page + 1}
      onPageChange={(p) => setPage(p - 1)}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      fetching={query.isFetching}
      defaultColumnProps={{
        cellsStyle: () => ({
          paddingTop: rem(12),
          paddingBottom: rem(12),
          fontSize: rem(14)
        })
      }}
    />
  );
}
