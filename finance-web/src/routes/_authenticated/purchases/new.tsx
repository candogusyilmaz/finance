import { Button, Divider, Group, Modal, NumberInput, Paper, Stack, Table, Text, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBasket, IconCalendar, IconPackage, IconPlus, IconReceiptTax, IconTrash } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'src/api/axios';
import { type ApiError, setInvalidParams } from 'src/api/types/Defaults';
import type { CreateCompanyPurchaseRequest, CreatePurchaseItemRequest } from 'src/api/types/PurchaseTypes';
import CompanySelect from 'src/components/Dropdowns/CompanySelect';
import CurrencySelect from 'src/components/Dropdowns/CurrencySelect';
import ProductSelect from 'src/components/Dropdowns/ProductSelect';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import { FormatPrice } from 'src/utils/formatter';
import { FieldErrorMessage } from 'src/utils/zod-messages';
import { z } from 'zod';

export const Route = createFileRoute('/_authenticated/purchases/new')({
  component: New
});

const purchaseSchema = z.object({
  companyId: z.string(FieldErrorMessage('Şirket')),
  purchaseDate: z.date(FieldErrorMessage('Satın alım tarihi')),
  currencyId: z.string(FieldErrorMessage('Para birimi'))
});

function New() {
  const [currencyCode, setCurrencyCode] = useState<string | undefined>();
  const [products, setProducts] = useState<(CreatePurchaseItemRequest & { productName?: string })[]>([]);
  const client = useQueryClient();
  const navigate = Route.useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      companyId: '',
      description: '',
      purchaseDate: new Date(),
      currencyId: '',
      official: false
    },
    validate: zodResolver(purchaseSchema)
  });

  const removeProduct = (idx: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const create = useMutation({
    mutationFn: async (data: CreateCompanyPurchaseRequest) => {
      return await api.post('/purchases', data);
    },
    onSuccess(_data, _variables) {
      notifications.show({
        message: 'Kayıt başarıyla oluşturuldu.',
        color: 'green'
      });
      client.invalidateQueries({
        queryKey: 'purchases'
      });
      navigate({
        to: '/purchases',
        search: {
          page: 0,
          size: 20,
          sort: { id: 'id', direction: 'desc' }
        }
      });
    },
    onError(error: ApiError, _variables, _context) {
      const invalidParams = setInvalidParams(error.response?.data, (field, msg) => form.setFieldError(field, msg));

      if (!invalidParams && error.response?.data.detail) {
        notifications.show({
          message: error.response.data.detail,
          color: 'red'
        });
      }
    }
  });

  function calculateTotal() {
    return products.reduce((sum, product) => sum + product.quantity * product.unitPrice, 0);
  }

  return (
    <Stack>
      <Group mb="lg">
        <IconBasket size={36} />
        <RouteTitle title="Yeni Satın Alım" />
      </Group>
      <Group grow align="flex-start">
        <Stack>
          <Group grow align="flex-start">
            <CompanySelect label="Şirket" placeholder="Şirket seçin" withAsterisk {...form.getInputProps('companyId')} />
            <DateInput
              label="Satın Alım Tarihi"
              placeholder="GG/AA/YYYY"
              valueFormat="DD/MM/YYYY HH:mm"
              leftSection={<IconCalendar size={18} />}
              withAsterisk
              {...form.getInputProps('purchaseDate')}
            />
          </Group>
          <Group>
            <CurrencySelect
              withAsterisk
              {...form.getInputProps('currencyId')}
              onChange={(val, opt) => {
                form.getInputProps('currencyId').onChange(val);
                setCurrencyCode(opt?.label);
              }}
            />
          </Group>
          <Textarea
            label="Açıklama"
            autosize
            minRows={4}
            maxRows={5}
            placeholder="Satın alım ile ilgili açıklama"
            {...form.getInputProps('description')}
          />

          <Divider my="lg" label="Ürünler" labelPosition="center" />

          <Group mb="sm">
            <AddProduct setProducts={setProducts} />
          </Group>

          <Paper withBorder radius="sm">
            <PurchaseProductDisplayTable currencyCode={currencyCode} products={products} removeProduct={removeProduct} />
          </Paper>

          <Group justify="space-between" mt="md">
            <Text size="xl" fw={500}>
              Toplam: {FormatPrice(calculateTotal(), currencyCode)}
            </Text>
            <Button
              onClick={() =>
                create.mutate({
                  ...form.getValues(),
                  purchasedItems: products
                })
              }>
              Oluştur
            </Button>
          </Group>
        </Stack>
        <Stack>secilen tarih araligindaki urun fiyatlarini listele</Stack>
      </Group>
    </Stack>
  );
}

const productSchema = z.object({
  productId: z.string(FieldErrorMessage('Ürün adı')),
  quantity: z.number(FieldErrorMessage('Miktar')).min(1, 'En az 1 adet urun olmalidir.'),
  unitPrice: z.number(FieldErrorMessage('Birim fiyat')).min(0, 'Urun fiyati negatif olamaz.'),
  description: z.string().optional(),
  vatRate: z.number(FieldErrorMessage('KDV oranı')).min(0, 'En az 1'),
  withholdingTaxRate: z.number(FieldErrorMessage('Stopaj oranı')).min(0, 'Stopaj Orani minimum 0 olmalidir.')
});

function AddProduct({ setProducts }: Readonly<{ setProducts: React.Dispatch<React.SetStateAction<CreatePurchaseItemRequest[]>> }>) {
  const [opened, { open, close }] = useDisclosure(false);

  const productForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      productId: undefined! as number | string,
      quantity: undefined! as number,
      unitPrice: undefined! as number,
      description: '',
      vatRate: undefined! as number,
      withholdingTaxRate: undefined! as number
    },
    validate: zodResolver(productSchema)
  });

  const addProduct = (values: CreatePurchaseItemRequest) => {
    setProducts((prev) => [...prev, values]);
    productForm.reset();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Ürün Ekle">
        <form
          onSubmit={productForm.onSubmit((data) => {
            addProduct(data);
            close();
          })}>
          <Stack>
            <ProductSelect
              label="Ürün Adı"
              placeholder="Ürün Adı"
              withAsterisk
              key={productForm.key('productId')}
              {...productForm.getInputProps('productId')}
              onChange={(val, opt) => {
                productForm.getInputProps('productId').onChange(val);
                productForm.setFieldValue('productName', opt.label);
              }}
            />
            <Group grow align="flex-start">
              <NumberInput
                label="Miktar"
                placeholder="Miktar"
                min={1}
                withAsterisk
                key={productForm.key('quantity')}
                {...productForm.getInputProps('quantity')}
              />
              <NumberInput
                label="Fiyat"
                placeholder="Fiyat"
                min={0}
                withAsterisk
                hideControls
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                key={productForm.key('unitPrice')}
                {...productForm.getInputProps('unitPrice')}
              />
            </Group>
            <Group grow align="flex-start">
              <NumberInput
                label="KDV Oranı"
                placeholder="%20"
                min={0}
                max={100}
                decimalScale={2}
                leftSection={<IconReceiptTax size={18} />}
                prefix="%"
                withAsterisk
                key={productForm.key('vatRate')}
                {...productForm.getInputProps('vatRate')}
              />
              <NumberInput
                label="Stopaj Oranı"
                placeholder="%8"
                min={0}
                max={100}
                decimalScale={2}
                withAsterisk
                leftSection={<IconReceiptTax size={18} />}
                prefix="%"
                key={productForm.key('withholdingTaxRate')}
                {...productForm.getInputProps('withholdingTaxRate')}
              />
            </Group>
            <Textarea
              label="Açıklama"
              placeholder="Ürün ile ilgili notlar"
              key={productForm.key('description')}
              {...productForm.getInputProps('description')}
            />
            <Button type="submit">Ekle</Button>
          </Stack>
        </form>
      </Modal>
      <Button
        variant="default"
        ml="auto"
        size="xs"
        onClick={() => {
          productForm.reset();
          open();
        }}
        leftSection={<IconPlus size={14} />}>
        Ürün Ekle
      </Button>
    </>
  );
}

function PurchaseProductDisplayTable({
  products,
  currencyCode,
  removeProduct
}: Readonly<{
  currencyCode: string | undefined;
  products: (CreatePurchaseItemRequest & { productName?: string })[];
  removeProduct: (id: number) => void;
}>) {
  return (
    <Table striped highlightOnHover styles={{ table: { tableLayout: 'fixed' } }}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Ürün Adı</Table.Th>
          <Table.Th w={75} ta="center">
            Miktar
          </Table.Th>
          <Table.Th w={100} ta="right">
            Fiyat
          </Table.Th>
          <Table.Th w={150} ta="right">
            Toplam
          </Table.Th>
          <Table.Th w={80} ta="center" />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {products.map((product, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Table.Tr key={index}>
            <Table.Td>
              <Group>
                <IconPackage size={16} />
                <Text size="sm">{product.productName}</Text>
              </Group>
            </Table.Td>
            <Table.Td align="center">
              <Text size="sm" fw={500}>
                {product.quantity}
              </Text>
            </Table.Td>
            <Table.Td align="right">
              <Text size="sm">{FormatPrice(product.unitPrice, currencyCode)}</Text>
            </Table.Td>
            <Table.Td align="right">
              <Text size="sm" fw={700}>
                {FormatPrice(product.quantity * product.unitPrice, currencyCode)}
              </Text>
            </Table.Td>
            <Table.Td align="center">
              <Button variant="subtle" color="red" onClick={() => removeProduct(index)}>
                <IconTrash size={16} />
              </Button>
            </Table.Td>
          </Table.Tr>
        ))}

        {products.length === 0 && (
          <Table.Tr>
            <Table.Td colSpan={5}>
              <Text c="gray.5">Henüz ürün eklenmedi</Text>
            </Table.Td>
          </Table.Tr>
        )}
      </Table.Tbody>
    </Table>
  );
}
