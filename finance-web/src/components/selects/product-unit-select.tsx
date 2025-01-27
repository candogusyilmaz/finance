import { Select, type SelectProps, rem } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import type { GetProductUnitsResponse } from 'src/api/types/ProductTypes';

export function ProductUnitSelect(props: SelectProps) {
  const unitsQuery = useQuery({
    queryKey: ['product-units'],
    queryFn: async () => {
      return (await api.get<GetProductUnitsResponse[]>('/product-units')).data;
    },
    select: (data) => data.map((s) => ({ label: s.name, value: s.id.toString() })),
    staleTime: Number.POSITIVE_INFINITY
  });

  return (
    <Select
      comboboxProps={{ shadow: 'md' }}
      label="Birim"
      placeholder="Ürün birimi"
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconBox style={{ width: rem(18), height: rem(18) }} />}
      data={unitsQuery.data}
      {...props}
    />
  );
}
