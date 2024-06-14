import { Select, rem, type SelectProps } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import type { ProductUnitResponse } from 'src/api/types/ProductTypes';

const ProductUnitSelect = (props: SelectProps) => {
  const unitsQuery = useQuery({
    queryKey: ['product-units'],
    queryFn: async () => {
      return (await api.get<ProductUnitResponse[]>('/product-units')).data;
    },
    select: (data) =>
      data.map((s) => ({ label: s.name, value: s.id.toString() })),
    staleTime: Number.POSITIVE_INFINITY,
    cacheTime: Number.POSITIVE_INFINITY
  });

  return (
    <Select
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
};

export default ProductUnitSelect;
