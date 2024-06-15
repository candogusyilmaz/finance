import {
  LoadingOverlay,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
  rem
} from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { PageSchema, type ApiError } from 'src/api/types/Defaults';
import type { GetProductByIdResponse } from 'src/api/types/ProductTypes';
import { FormatDate } from 'src/utils/formatter';
import { z } from 'zod';
import ProductPricesTable from './-(components)/ProductPricesTable';
import ProductWarehousesTable from './-(components)/ProductWarehousesTable';

export const Route = createFileRoute('/_authenticated/products/$productId')({
  component: Product,
  parseParams: (rawParams) => ({
    productId: Number.parseInt(rawParams.productId)
  }),
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
    queryFn: async () => {
      return (await api.get<GetProductByIdResponse>(`/products/${productId}`))
        .data;
    },
    onError(err: ApiError) {
      if (err.response?.status === 404) {
        navigate({
          to: '/products',
          search: { page: 0, size: 20, sort: { id: 'id', direction: 'desc' } }
        });
      }
    }
  });

  if (query.isLoading) return <LoadingOverlay visible />;

  if (query.isError || !query.data) return <>error</>;

  return (
    <Stack>
      <Title>{query.data.name}</Title>
      <SimpleGrid cols={3} px={rem(32)}>
        <TextGroup label="ID" value={query.data.id} />
        <TextGroup
          label="Tür"
          value={query.data.type === 'PRODUCT' ? 'Ürün' : 'Hizmet'}
        />
        <TextGroup label="Birim" value={query.data.unit?.name} />
        <TextGroup label="Kategori" value={query.data.category?.name} />
        <TextGroup
          label="Oluşturulma Tarihi"
          value={FormatDate(query.data.timestamp.createdAt)}
        />
        <TextGroup
          label="Son Güncellenme Tarihi"
          value={FormatDate(query.data.timestamp.updatedAt)}
        />
      </SimpleGrid>
      <Tabs
        keepMounted={false}
        variant="outline"
        orientation="vertical"
        value={tab}
        onChange={(s) =>
          navigate({
            search: (prev) => ({
              ...prev,
              tab: s as 'warehouses' | 'prices'
            })
          })
        }
      >
        <Tabs.List>
          <Tabs.Tab value="warehouses">Bulunduğu Depolar</Tabs.Tab>
          <Tabs.Tab value="prices">Alınan Fiyatlar</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="warehouses" px={rem(12)}>
          <ProductPricesTable />
        </Tabs.Panel>
        <Tabs.Panel value="prices" px={rem(12)}>
          <ProductWarehousesTable />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
}

function TextGroup({
  label,
  value
  // biome-ignore lint/suspicious/noExplicitAny:
}: Readonly<{ label: string; value: any }>) {
  return (
    <Stack gap={0} miw={rem(150)}>
      <Text fz="md" fw={500} c="var(--mantine-color-gray-6)">
        {label}
      </Text>
      <Text fz="xl">{value || '-'}</Text>
    </Stack>
  );
}
