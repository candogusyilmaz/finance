import { MultiSelect, type MultiSelectProps } from '@mantine/core';
import { IconComponents } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';

const ProfessionMultiSelect = (props: MultiSelectProps) => {
  const query = useQuery({
    queryKey: ['professions', 'simple'],
    queryFn: async () => {
      return (await api.get<{ id: number; name: string }[]>('/professions/simple')).data;
    },
    cacheTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) => data.map((s) => ({ label: s.name, value: s.id.toString() }))
  });

  return (
    <MultiSelect
      comboboxProps={{ shadow: 'md' }}
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconComponents size={18} />}
      data={query.data}
      {...props}
    />
  );
};

export default ProfessionMultiSelect;
