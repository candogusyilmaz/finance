import { Select, type SelectProps } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';

const EmployeeSelect = (props: SelectProps) => {
  const query = useQuery({
    queryKey: ['employees', 'simple'],
    queryFn: async () => {
      return (
        await api.get<{ id: number; name: string }[]>('/employees/simple')
      ).data;
    },
    cacheTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) =>
      data.map((s) => ({ label: s.name, value: s.id.toString() }))
  });

  return (
    <Select
      comboboxProps={{ shadow: 'md' }}
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconUser size={18} />}
      data={query.data}
      {...props}
    />
  );
};

export default EmployeeSelect;
