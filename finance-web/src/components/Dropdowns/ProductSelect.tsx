import { Select, type SelectProps } from '@mantine/core';
import { IconAsset } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';

const ProductSelect = (props: SelectProps) => {
  const query = useQuery({
    queryKey: ['products', 'simple'],
    queryFn: async () => {
      return (await api.get<{ id: number; name: string }[]>('/products/simple')).data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) => data.map((s) => ({ label: s.name, value: s.id.toString() }))
  });

  return (
    <Select
      comboboxProps={{ shadow: 'md' }}
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconAsset size={18} />}
      data={query.data}
      {...props}
    />
  );
};

export default ProductSelect;
