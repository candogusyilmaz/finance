import { Select, rem, type SelectProps } from '@mantine/core';
import { IconCategory } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import type { ProductCategoryResponse } from 'src/api/types/ProductTypes';

const ProductCategorySelect = (props: SelectProps) => {
  const categoriesQuery = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      return (await api.get<ProductCategoryResponse[]>('/product-categories'))
        .data;
    },
    select: (data) =>
      data.map((s) => ({ label: s.name, value: s.id.toString() })),
    staleTime: Number.POSITIVE_INFINITY,
    cacheTime: Number.POSITIVE_INFINITY
  });

  return (
    <Select
      label="Kategori"
      placeholder="Ürün kategorisi"
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconCategory style={{ width: rem(18), height: rem(18) }} />}
      data={categoriesQuery.data}
      {...props}
    />
  );
};

export default ProductCategorySelect;
