import { Select, type SelectProps } from '@mantine/core';
import { IconBuildingSkyscraper } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';

const OrganizationSelect = (props: SelectProps) => {
  const query = useQuery({
    queryKey: ['organizations', 'simple'],
    queryFn: async () => {
      return (await api.get<{ id: number; name: string }[]>('/organizations/simple')).data;
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
      leftSection={<IconBuildingSkyscraper size={18} />}
      data={query.data}
      {...props}
    />
  );
};

export default OrganizationSelect;
