import { Group, Stack, Text, rem } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import CreateProductModal from './-(components)/CreateProductModal';
import ProductsTable from './-(components)/ProductsTable';

export const Route = createFileRoute('/_authenticated/products/')({
  component: Products,
  validateSearch: PageSchema
});

function Products() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Text>Top Nav Bar</Text>
      <Group align="center">
        <Text pl={rem(8)} size={rem(32)} w={rem(200)}>
          Ürünler
        </Text>
        <CreateProductModal />
      </Group>
      <ProductsTable />
    </Stack>
  );
}
