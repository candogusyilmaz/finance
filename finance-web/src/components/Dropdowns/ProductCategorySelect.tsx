import { Select, type SelectProps, rem } from '@mantine/core';
import { IconCategory } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import type { GetProductCategoriesResponse } from 'src/api/types/ProductTypes';

const ProductCategorySelect = (props: SelectProps) => {
  const categoriesQuery = useQuery({
    queryKey: ['product-categories'],
    queryFn: async () => {
      return (await api.get<GetProductCategoriesResponse[]>('/product-categories')).data;
    },
    select: (data) => data.map((s) => ({ label: s.name, value: s.id.toString() })),
    staleTime: Number.POSITIVE_INFINITY
  });

  return (
    <Select
      comboboxProps={{ shadow: 'md' }}
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
