import { Select, type SelectProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';

const CompanyAutocompleteSelect = (props: SelectProps) => {
  const query = useQuery({
    queryKey: ['companies', 'simple'],
    queryFn: async () => {
      return (
        await api.get<{ id: number; name: string }[]>('/companies/simple')
      ).data;
    },
    cacheTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) =>
      data.map((s) => ({ label: s.name, value: s.id.toString() }))
  });

  return (
    <Select
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconSearch size={18} />}
      data={query.data}
      {...props}
    />
  );
};

export default CompanyAutocompleteSelect;
