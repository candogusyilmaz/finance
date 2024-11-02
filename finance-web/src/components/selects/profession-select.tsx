import { Select, type SelectProps } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';

export function ProfessionSelect(props: SelectProps) {
  const query = useQuery({
    queryKey: ['professions'],
    queryFn: async () => {
      return (await api.get<{ id: number; name: string }[]>('/professions')).data;
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
      leftSection={<IconComponents size={18} />}
      data={query.data}
      {...props}
    />
  );
}
