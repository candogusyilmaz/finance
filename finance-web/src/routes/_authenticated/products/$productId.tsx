import { Card, Grid, LoadingOverlay, Stack, Tabs, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from 'src/api/axios';
import { PageSchema } from 'src/api/types/Defaults';
import type { GetProductByIdResponse } from 'src/api/types/ProductTypes';
import { FormatDateTime } from 'src/utils/formatter';
import { z } from 'zod';
import { ProductPricesTable } from './-components/ProductPricesTable';
import { ProductWarehousesTable } from './-components/ProductWarehousesTable';

export const Route = createFileRoute('/_authenticated/products/$productId')({
  component: Product,
  validateSearch: PageSchema.extend({
    tab: z.enum(['warehouses', 'prices']).catch('warehouses')
  })
});

function Product() {
  const { productId } = Route.useParams();
  const { tab } = Route.useSearch();

  const navigate = Route.useNavigate();
  const query = useQuery({
    queryKey: ['products', productId],
    staleTime: Number.POSITIVE_INFINITY,
    queryFn: async () => {
      return (await api.get<GetProductByIdResponse>(`/products/${productId}`)).data;
    }
  });

  if (query.isLoading) return <LoadingOverlay visible />;

  if (query.isError || !query.data) return <>error</>;

  return (
    <Stack>
      <Title>Ürün Detayı</Title>
      <Grid align="flex-start">
        <Grid.Col span={{ base: 12, md: 4, lg: 2 }}>
          <Card padding="lg" radius="md" withBorder>
            <Stack gap={8}>
              <TextGroup label="ID" value={query.data.id} />
              <TextGroup label="Ürün" value={query.data.name} />
              <TextGroup label="Tür" value={query.data.type === 'PRODUCT' ? 'Ürün' : 'Hizmet'} />
              <TextGroup label="Birim" value={query.data.unit?.name} />
              <TextGroup label="Kategori" value={query.data.category?.name} />
              <TextGroup label="Oluşturulma Tarihi" value={FormatDateTime(query.data.timestamp.createdAt)} />
              <TextGroup label="Son Güncellenme Tarihi" value={FormatDateTime(query.data.timestamp.updatedAt)} />
            </Stack>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8, lg: 10 }}>
          <Tabs
            w="100%"
            keepMounted={false}
            variant="default"
            orientation="horizontal"
            value={tab}
            radius="md"
            onChange={(s) =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  tab: s as 'warehouses' | 'prices'
                })
              })
            }
            styles={{
              list: { marginBottom: 'var(--mantine-spacing-md)' },
              panel: { height: '100%' }
            }}>
            <Tabs.List>
              <Tabs.Tab value="warehouses">Bulunduğu Depolar</Tabs.Tab>
              <Tabs.Tab value="prices">Alınan Fiyatlar</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="warehouses">
              <ProductWarehousesTable />
            </Tabs.Panel>
            <Tabs.Panel value="prices">
              <ProductPricesTable />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

function TextGroup({
  label,
  value
  // biome-ignore lint/suspicious/noExplicitAny:
}: Readonly<{ label: string; value: any }>) {
  return (
    <Stack gap={0} justify="space-between">
      <Text fz="md" fw={500} c="var(--mantine-color-gray-6)">
        {label}
      </Text>
      <Text fz="md">{value || '-'}</Text>
    </Stack>
  );
}
