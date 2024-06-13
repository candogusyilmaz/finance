import { Select, rem, type SelectProps } from '@mantine/core';
import { IconBox } from '@tabler/icons-react';

const ProductUnitSelect = (props: SelectProps) => {
  return (
    <Select
      label="Birim"
      placeholder="Ürün birimi"
      searchable
      nothingFoundMessage="Sonuç bulunamadı"
      maxDropdownHeight={200}
      leftSection={<IconBox style={{ width: rem(18), height: rem(18) }} />}
      {...props}
    />
  );
};

export default ProductUnitSelect;
