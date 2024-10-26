import { Group, Stack } from '@mantine/core';
import { IconBuildingWarehouse } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/ui/route-title';
import { CreateProductModal } from './-components/CreateProductModal';
import { ProductsTable } from './-components/ProductsTable';

export const Route = createFileRoute('/_authenticated/products/')({
  component: Products,
  validateSearch: zodSearchValidator(PageSchema)
});

function Products() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center" mb="lg">
        <IconBuildingWarehouse size={36} />
        <RouteTitle title="Ürünler" />
      </Group>
      <Stack>
        <Group justify="flex-end">
          <CreateProductModal />
        </Group>
        <ProductsTable />
      </Stack>
    </Stack>
  );
}
