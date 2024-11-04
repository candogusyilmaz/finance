import { type ComboboxItem, Select, type SelectProps } from '@mantine/core';
import { IconCurrency } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/axios';

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

interface CurrencyOption extends ComboboxItem {
  name: string;
  code: string;
  symbol: string;
  value: string;
}

interface CustomSelectProps extends Omit<SelectProps, 'data'> {
  onCurrencyChange?: (item: CurrencyOption | null) => void;
}

export function CurrencySelect({ onCurrencyChange, ...props }: CustomSelectProps) {
  const query = useQuery({
    queryKey: ['/currencies'],
    queryFn: async () => {
      return (await api.get<Currency[]>('/currencies')).data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) => data.map((s) => ({ ...s, label: s.code, value: s.id.toString() }))
  });

  const handleChange = (value: string | null, item: ComboboxItem) => {
    if (onCurrencyChange) {
      const selectedCurrency = item as CurrencyOption;
      onCurrencyChange(selectedCurrency);
    }
    if (props.onChange) {
      props.onChange(value, item);
    }
  };

  return (
    <Select
      label="Para Birimi"
      placeholder="TRY"
      comboboxProps={{ shadow: 'md' }}
      maxDropdownHeight={200}
      leftSection={<IconCurrency size={18} />}
      data={query.data}
      {...props}
      onChange={handleChange}
    />
  );
}
