import { rem } from '@mantine/core';
import { DataTable, type DataTableProps } from 'mantine-datatable';

export default function PreconfiguredDataTable<T>(props: DataTableProps<T>) {
  return (
    <DataTable
      borderRadius="md"
      withTableBorder
      striped
      highlightOnHover
      defaultColumnProps={{
        cellsStyle: () => ({
          paddingTop: rem(12),
          paddingBottom: rem(12),
          fontSize: rem(14)
        })
      }}
      styles={{
        header: {
          height: rem(48)
        }
      }}
      height={rem(600)}
      {...props}
    />
  );
}
