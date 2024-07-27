import { Group, Stack } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import CreateProductModal from './-components/CreateProductModal';
import ProductsTable from './-components/ProductsTable';

export const Route = createFileRoute('/_authenticated/products/')({
  component: Products,
  validateSearch: PageSchema
});

function Products() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center">
        <RouteTitle>Ürünler</RouteTitle>
        <CreateProductModal />
      </Group>
      <ProductsTable />
    </Stack>
  );
}
