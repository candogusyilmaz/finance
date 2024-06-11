import { Stack } from '@mantine/core';
import type { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useMemo } from 'react';
import { useGetCompanies } from '../../../../api/Company';
import type { CompanyResponse } from '../../../../api/types/Company';

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

const columnDefs: (ColDef<CompanyResponse> | ColGroupDef<CompanyResponse>)[] = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'name',
    headerName: 'Sirket',
    headerCheckboxSelection: true,
    checkboxSelection: true
  },
  { field: 'address', headerName: 'Adres', hide: true },
  { field: 'email', headerName: 'Email', hide: true },
  { field: 'phoneNumber', headerName: 'Telefon' },
  { field: 'taxOffice', headerName: 'Vergi Dairesi' },
  { field: 'taxRegistrationNumber', headerName: 'Vergi Numarasi' },
  {
    field: 'createdAt',
    headerName: 'Olusturulma Tarihi',
    valueFormatter: (params) => dateFormatter(params.value)
  },
  {
    field: 'updatedAt',
    headerName: 'Son Guncelleme Tarihi',
    valueFormatter: (params) => dateFormatter(params.value)
  }
];

export default function CompaniesTable() {
  const query = useGetCompanies({ page: 0, size: 20 });

  const statusBar = useMemo<{
    statusPanels: any;
  }>(() => {
    return {
      statusPanels: [
        {
          statusPanel: 'agAggregationComponent',
          statusPanelParams: {
            aggFuncs: ['count', 'sum']
          }
        }
      ]
    };
  }, []);

  return (
    <Stack className="ag-theme-quartz" h="100%" gap={0}>
      <AgGridReact
        rowData={query.data?.content}
        columnDefs={columnDefs}
        defaultColDef={{ flex: 1 }}
        rowSelection={'multiple'}
        suppressRowClickSelection
      />
    </Stack>
  );
}
