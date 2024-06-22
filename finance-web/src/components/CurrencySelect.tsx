import { Select, type ComboboxItem, type SelectProps } from '@mantine/core';
import { IconCurrency } from '@tabler/icons-react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';

interface Currency {
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

const CurrencySelect = ({ onCurrencyChange, ...props }: CustomSelectProps) => {
  const query = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      return (await api.get<Currency[]>('/currencies')).data;
    },
    cacheTime: Number.POSITIVE_INFINITY,
    staleTime: Number.POSITIVE_INFINITY,
    select: (data) =>
      data.map((s) => ({ ...s, label: s.code, value: s.id.toString() }))
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
      maxDropdownHeight={200}
      leftSection={<IconCurrency size={18} />}
      data={query.data}
      {...props}
      onChange={handleChange}
    />
  );
};

export default CurrencySelect;
