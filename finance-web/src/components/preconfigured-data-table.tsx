import { rem } from '@mantine/core';
import { DataTable, type DataTableProps } from 'mantine-datatable';

export function PreconfiguredDataTable<T>(props: DataTableProps<T>) {
  return (
    <DataTable
      borderRadius="xs"
      withTableBorder
      styles={{
        header: {
          height: rem(48)
        }
      }}
      height={rem(600)}
      noRecordsText="Listenelecek kayıt bulunmuyor"
      striped
      highlightOnHover
      verticalSpacing="sm"
      {...props}
    />
  );
}
