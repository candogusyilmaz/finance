import { Select, type SelectProps } from '@mantine/core';
import { IconBuildingFactory2 } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';

export function WorksiteSelect(props: SelectProps) {
  const query = useQuery({
    queryKey: ['worksites', 'simple'],
    queryFn: async () => {
      return (await api.get<{ id: number; name: string }[]>('/worksites/simple')).data;
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
      leftSection={<IconBuildingFactory2 size={18} />}
      data={query.data}
      {...props}
    />
  );
}
