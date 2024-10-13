import { Select, type SelectProps } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import { createURL } from 'src/api/types/Defaults';
import type { PartyRole } from 'src/api/types/PartyTypes';

interface PartyProps extends SelectProps {
  partyRoles: PartyRole[];
}

const PartySelect = ({ partyRoles, ...props }: PartyProps) => {
  const query = useQuery({
    queryKey: ['parties', 'simple', partyRoles],
    queryFn: async () => {
      return (await api.get<{ id: number; name: string }[]>(createURL('/parties/simple', undefined, { roles: partyRoles }))).data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) => data.map((s) => ({ label: s.name, value: s.id.toString() }))
  });

  return (
    <Select
      limit={20}
      comboboxProps={{ shadow: 'md' }}
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconBuilding size={18} />}
      data={query.data}
      {...props}
    />
  );
};

export default PartySelect;
