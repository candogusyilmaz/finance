import { ActionIcon, Flex, Table, type TableProps } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconArrowsSort } from '@tabler/icons-react';
import { compareAsc, isDate, parseISO } from 'date-fns';
import type React from 'react';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { getNestedValue } from './helpers';

type SortDirection = 'asc' | 'desc';

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export interface ColumnDef<T extends object> {
  key: NestedKeyOf<T>;
  header?: string | React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: T[keyof T], b: T[keyof T]) => number;
  render?: (row: T) => React.ReactNode;
}

interface DataGridProps<T extends object> {
  columns: ColumnDef<T>[];
  data?: T[];
  tableProps?: TableProps;
  fetchUrl?: string;
}

export interface SortConfig<T extends object> {
  key: NestedKeyOf<T>;
  direction: SortDirection;
}

function SlimTable<T extends object>({ columns, data, tableProps, fetchUrl }: Readonly<DataGridProps<T>>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | undefined>();

  const { data: response } = useQuery({
    queryKey: [fetchUrl],
    queryFn: async () => {
      if (!fetchUrl) return;

      return (await api.get<T[]>(fetchUrl)).data;
    },
    cacheTime: 120000,
    staleTime: 120000,
    enabled: fetchUrl !== undefined && fetchUrl !== null
  });

  const requestSort = (key: NestedKeyOf<T>) => {
    if (!key) setSortConfig(undefined);

    let direction: SortDirection = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sc: SortConfig<T> = {
      key,
      direction
    };

    setSortConfig(sc);
  };

  const sortedData = useMemo(() => {
    if (!fetchUrl || !data) return [];

    if (fetchUrl && (!response || response.length === 0)) return [];

    const sortableItems = fetchUrl ? [...response!] : [...data];

    if (!sortConfig?.key) return sortableItems;

    const sortKey = sortConfig.key;
    const directionMultiplier = sortConfig.direction === 'asc' ? 1 : -1;

    sortableItems.sort((a, b) => {
      const column = columns.find((col) => col.key === sortKey);
      const aValue = getNestedValue(a, sortKey);
      const bValue = getNestedValue(b, sortKey);

      if (column?.sortFn) {
        return column.sortFn(aValue, bValue) * directionMultiplier;
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * directionMultiplier;
      }

      const isAValueDate = isDate(aValue) || (typeof aValue === 'string' && !Number.isNaN(Date.parse(aValue)));
      const isBValueDate = isDate(bValue) || (typeof bValue === 'string' && !Number.isNaN(Date.parse(bValue)));

      if (isAValueDate && isBValueDate) {
        const parsedAValue = isDate(aValue) ? aValue : parseISO(aValue);
        const parsedBValue = isDate(bValue) ? bValue : parseISO(bValue);

        return compareAsc(parsedAValue, parsedBValue) * directionMultiplier;
      }

      const aString = aValue?.toString().toLowerCase() ?? '';
      const bString = bValue?.toString().toLowerCase() ?? '';
      if (aString < bString) return -1 * directionMultiplier;
      if (aString > bString) return 1 * directionMultiplier;

      return 0;
    });

    return sortableItems;
  }, [data, sortConfig, columns, fetchUrl, response]);

  return (
    <Table highlightOnHover highlightOnHoverColor="dark.6" {...tableProps}>
      <Table.Thead>
        <Table.Tr
          styles={{
            tr: {
              backgroundColor: 'var(--mantine-color-dark-5)'
            }
          }}>
          {columns.map((column) => (
            <Table.Th key={column.key as string} className="p-2 text-left">
              <Flex align="center">
                {column.header ?? column.key}
                {column.sortable && (
                  <ActionIcon size="sm" color="dark.1" variant="transparent" onClick={() => requestSort(column.key)} ml="auto">
                    {sortConfig?.key === column.key ? (
                      sortConfig?.direction === 'desc' ? (
                        <IconArrowUp size={16} />
                      ) : (
                        <IconArrowDown size={16} />
                      )
                    ) : (
                      <IconArrowsSort size={16} />
                    )}
                  </ActionIcon>
                )}
              </Flex>
            </Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {sortedData.map((row, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Table.Tr key={index}>
            {columns.map((column, colIndex) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Table.Td key={colIndex}>
                {column.render ? column.render(row) : <Flex align="center">{getNestedValue(row, column.key)}</Flex>}
              </Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

export default SlimTable;
