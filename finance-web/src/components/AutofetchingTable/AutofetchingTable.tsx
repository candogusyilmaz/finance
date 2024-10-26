import { ActionIcon, Alert, Flex, Group, Loader, Paper, type PaperProps, ScrollArea, Table, type TableProps, Text } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconArrowsSort, IconExclamationCircle } from '@tabler/icons-react';
import { type UseQueryOptions, useQuery } from '@tanstack/react-query';
import { type ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { api } from 'src/api/axios';
import classes from './AutofetchingTable.module.css';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type DataType = Record<string, any>;

type ReusableTableProps<T extends DataType> = {
  height?: number;
  columns: ColumnDef<T>[];
  fetchUrl: string;
  queryOptions?: Omit<UseQueryOptions<T[], Error>, 'queryKey' | 'queryFn'>;
  tableProps?: TableProps;
  paperProps?: PaperProps;
};

function AutofetchingTable<T extends DataType>({
  height = 400,
  columns,
  fetchUrl,
  queryOptions,
  tableProps,
  paperProps
}: ReusableTableProps<T>) {
  const query = useQuery<T[], Error>({
    queryKey: [fetchUrl],
    queryFn: async () => (await api.get<T[]>(fetchUrl)).data,
    ...queryOptions
  });

  const table = useReactTable({
    data: query.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  if (query.isLoading) {
    return (
      <Paper withBorder>
        <Flex h={height} justify="center" align="center">
          <Loader />
        </Flex>
      </Paper>
    );
  }

  if (query.error)
    return (
      <Paper withBorder className={classes.error}>
        <Flex h={height} justify="center" align="center">
          <Alert variant="filled" color="red" icon={<IconExclamationCircle size={112} />}>
            Veriler yüklenirken bir hata oluştu.
          </Alert>
        </Flex>
      </Paper>
    );

  return (
    <Paper withBorder radius="xs" {...paperProps}>
      <ScrollArea
        h={height}
        styles={{
          scrollbar: {
            marginTop: 35,
            background: 'transparent'
          }
        }}>
        <Table {...tableProps} className={classes.table}>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id} style={{ width: header.getSize() }}>
                    {header.isPlaceholder ? null : (
                      <Group style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text size="sm" fw={600}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </Text>
                        {header.column.getCanSort() && (
                          <ActionIcon size="xs" variant="transparent" color="gray" onClick={header.column.getToggleSortingHandler()}>
                            {!header.column.getIsSorted() ? (
                              <IconArrowsSort size={16} />
                            ) : header.column.getIsSorted() === 'asc' ? (
                              <IconArrowUp size={16} />
                            ) : (
                              <IconArrowDown size={16} />
                            )}
                          </ActionIcon>
                        )}
                      </Group>
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

export default AutofetchingTable;
