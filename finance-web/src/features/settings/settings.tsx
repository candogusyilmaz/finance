import { Grid, Group, Paper, Title } from '@mantine/core';
import AutofetchingTable from 'src/components/AutofetchingTable/AutofetchingTable';
import {
  PAYMENT_CATEGORY_COLUMNS,
  PRODUCT_CATEGORY_COLUMNS,
  PRODUCT_UNIT_COLUMNS,
  PROFESSION_COLUMNS
} from './components/settings-table-columns';
import { CreateProfessionModalButton } from './modals/create-profession-modal';
import { UpsertPaymentCategory } from './modals/upsert-payment-category';
import { UpsertProductCategory } from './modals/upsert-product-category';
import { UpsertProductUnit } from './modals/upsert-product-unit';

export function Settings() {
  return (
    <Grid>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Ödeme Kategorileri</Title>
            <UpsertPaymentCategory />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PAYMENT_CATEGORY_COLUMNS} fetchUrl="/payment-categories" />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Meslekler</Title>
            <CreateProfessionModalButton />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PROFESSION_COLUMNS} fetchUrl="/professions" />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Ürün Kategorileri</Title>
            <UpsertProductCategory />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PRODUCT_CATEGORY_COLUMNS} fetchUrl="/product-categories" />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Ürün Birimleri</Title>
            <UpsertProductUnit />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PRODUCT_UNIT_COLUMNS} fetchUrl="/product-units" />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
