import { Grid, Group, Paper, Title } from '@mantine/core';
import { AutofetchingTable } from 'src/components/autofetching-table/autofetching-table';
import { Fodal } from 'src/components/fodal';
import { CreateButton } from 'src/components/ui/predefined-buttons';
import {
  PAYMENT_CATEGORY_COLUMNS,
  PRODUCT_CATEGORY_COLUMNS,
  PRODUCT_UNIT_COLUMNS,
  PROFESSION_COLUMNS
} from './components/settings-table-columns';
import { CreatePaymentCategoryForm } from './forms/create-payment-category-form';
import { CreateProductCategoryForm } from './forms/create-product-category-form';
import { CreateProductUnitForm } from './forms/create-product-unit-form';
import { CreateProfessionForm } from './forms/create-profession-form';

export function Settings() {
  return (
    <Grid>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Ödeme Kategorileri</Title>
            <Fodal
              title="Yeni Ödeme Kategorisi Oluştur"
              content={({ close }) => <CreatePaymentCategoryForm onSuccess={close} />}
              trigger={({ open }) => (
                <CreateButton variant="light" onClick={open}>
                  Yeni
                </CreateButton>
              )}
            />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PAYMENT_CATEGORY_COLUMNS} fetchUrl="/payment-categories" />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Meslekler</Title>
            <Fodal
              title="Yeni Meslek Oluştur"
              content={({ close }) => <CreateProfessionForm onSuccess={close} />}
              trigger={({ open }) => (
                <CreateButton variant="light" onClick={open}>
                  Yeni
                </CreateButton>
              )}
            />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PROFESSION_COLUMNS} fetchUrl="/professions" />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Ürün Kategorileri</Title>
            <Fodal
              title="Yeni Ürün Kategorisi Oluştur"
              content={({ close }) => <CreateProductCategoryForm onSuccess={close} />}
              trigger={({ open }) => (
                <CreateButton variant="light" onClick={open}>
                  Yeni
                </CreateButton>
              )}
            />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PRODUCT_CATEGORY_COLUMNS} fetchUrl="/product-categories" />
        </Paper>
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 6 }}>
        <Paper withBorder>
          <Group p="md" justify="space-between" align="center">
            <Title order={5}>Ürün Birimleri</Title>
            <Fodal
              title="Yeni Ürün Birimi Oluştur"
              content={({ close }) => <CreateProductUnitForm onSuccess={close} />}
              trigger={({ open }) => (
                <CreateButton variant="light" onClick={open}>
                  Yeni
                </CreateButton>
              )}
            />
          </Group>
          <AutofetchingTable paperProps={{ withBorder: false }} columns={PRODUCT_UNIT_COLUMNS} fetchUrl="/product-units" />
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
