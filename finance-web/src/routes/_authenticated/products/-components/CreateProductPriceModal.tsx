import { Box, Button, Group, Modal, NumberInput, Stack, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconCash, IconPlus, IconReceiptTax } from '@tabler/icons-react';
import type { AxiosError } from 'axios';
import { formatISO } from 'date-fns';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'src/api/axios';
import { type ProblemDetail, setInvalidParams } from 'src/api/types/Defaults';
import { PartyRoles } from 'src/api/types/PartyTypes';
import type { CreateProductPriceRequest } from 'src/api/types/ProductPriceTypes';
import CurrencySelect from 'src/components/Dropdowns/CurrencySelect';
import EmployeeSelect from 'src/components/Dropdowns/EmployeeSelect';
import PartySelect from 'src/components/Dropdowns/PartySelect';
import ProductSelect from 'src/components/Dropdowns/ProductSelect';
import { ConvertToNumber } from 'src/utils/utils';
import { z } from 'zod';

const productPriceSchema = z
  .object({
    productId: z.string().min(1, 'Ürün seçilmelidir.'),
    currencyId: z.string({ required_error: 'Para birimi seçilmelidir.' }),
    price: z.number({ required_error: 'Fiyat 0 veya daha büyük olmalıdır.' }),
    startDate: z.date({ required_error: 'Başlangıç tarihi gereklidir.' }),
    endDate: z.date({ required_error: 'Bitiş tarihi gereklidir.' }),
    supplierId: z.string().optional(),
    priceConfirmedById: z.string().optional(),
    vatRate: z.number().min(0, 'En az 0 olabilir.').max(100, 'En fazla 100 olabilir.'),
    withholdingTaxRate: z.number().min(0, 'En az 0 olabilir.').max(100, 'En fazla 100 olabilir.'),
    description: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate;
      }
      return true;
    },
    {
      message: 'Bitiş tarihi başlangıç tarihinden önce olamaz.',
      path: ['endDate']
    }
  );

export default function CreateProductPriceModal({ productId }: Readonly<{ productId: number }>) {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState<string | undefined>();

  const form = useForm({
    initialValues: {
      productId: productId.toString(),
      currencyId: undefined!,
      price: undefined!,
      startDate: undefined!,
      endDate: undefined!,
      supplierId: '' as string | undefined,
      priceConfirmedById: '' as string | undefined,
      vatRate: undefined as number | undefined,
      withholdingTaxRate: undefined as number | undefined,
      description: ''
    },
    validate: zodResolver(productPriceSchema),
    transformValues: (values): CreateProductPriceRequest => ({
      productId: Number.parseInt(values.productId),
      currencyId: Number.parseInt(values.currencyId),
      price: values.price,
      startDate: formatISO(values.startDate, { representation: 'date' }),
      endDate: formatISO(values.endDate, { representation: 'date' }),
      supplierId: ConvertToNumber(values.supplierId),
      priceConfirmedById: ConvertToNumber(values.priceConfirmedById),
      vatRate: values.vatRate,
      withholdingTaxRate: values.withholdingTaxRate,
      description: values.description
    })
  });

  const create = useMutation({
    mutationFn: async (data: CreateProductPriceRequest) => {
      return await api.post('/product-prices', data);
    },
    onSuccess(_data, variables) {
      notifications.show({
        message: 'Ürün fiyatı oluşturuldu.',
        color: 'green'
      });
      form.reset();
      close();
      client.invalidateQueries({
        queryKey: `product-${variables.productId}-prices`
      });
    },
    onError(error: AxiosError<ProblemDetail>, _variables, _context) {
      const invalidParams = setInvalidParams(error.response?.data, (field, msg) => form.setFieldError(field, msg));

      if (!invalidParams && error.response?.data.detail) {
        notifications.show({
          message: error.response.data.detail,
          color: 'red'
        });
      }
    }
  });

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title="Ürün Fiyat Tanımı"
        centered>
        <form onSubmit={form.onSubmit((data) => create.mutate(data))}>
          <Stack gap="md">
            <ProductSelect
              label="Ürün"
              placeholder="Ürün veya Hizmet"
              withAsterisk
              key={form.key('productId')}
              {...form.getInputProps('productId')}
            />
            <Group grow align="flex-start">
              <CurrencySelect
                label="Para Birimi"
                placeholder="TRY"
                withAsterisk
                key={form.key('currencyId')}
                {...form.getInputProps('currencyId')}
                onCurrencyChange={(opt) => setSelectedCurrencySymbol(opt?.symbol)}
              />
              <NumberInput
                label="Fiyat"
                placeholder="$100"
                withAsterisk
                decimalScale={2}
                thousandSeparator=","
                leftSection={<IconCash size={18} />}
                prefix={selectedCurrencySymbol ?? ''}
                hideControls
                allowNegative={false}
                key={form.key('price')}
                {...form.getInputProps('price')}
              />
            </Group>
            <Group grow align="flex-start">
              <DateInput
                clearable
                label="Başlangıç Tarihi"
                placeholder="gün/ay/yıl"
                withAsterisk
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={18} />}
                key={form.key('startDate')}
                {...form.getInputProps('startDate')}
              />
              <DateInput
                clearable
                label="Bitiş Tarihi"
                placeholder="gün/ay/yıl"
                withAsterisk
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={18} />}
                key={form.key('endDate')}
                {...form.getInputProps('endDate')}
              />
            </Group>
            <PartySelect
              label="Tedarikçi"
              placeholder="Tedarikçi"
              partyRoles={[PartyRoles.SUPPLIER]}
              key={form.key('supplierId')}
              {...form.getInputProps('supplierId')}
            />
            <EmployeeSelect
              label="Onaylayan"
              placeholder="Fiyat teyit alınan kişi"
              key={form.key('priceConfirmedById')}
              {...form.getInputProps('priceConfirmedById')}
            />
            <Group grow align="flex-start">
              <NumberInput
                withAsterisk
                label="KDV Oranı"
                placeholder="%20"
                min={0}
                max={100}
                decimalScale={2}
                leftSection={<IconReceiptTax size={18} />}
                prefix="%"
                key={form.key('vatRate')}
                {...form.getInputProps('vatRate')}
              />
              <NumberInput
                withAsterisk
                label="Stopaj Oranı"
                placeholder="%8"
                min={0}
                max={100}
                decimalScale={2}
                leftSection={<IconReceiptTax size={18} />}
                prefix="%"
                key={form.key('withholdingTaxRate')}
                {...form.getInputProps('withholdingTaxRate')}
              />
            </Group>

            <Textarea
              label="Açıklama"
              placeholder="Ürün ile ilgili gerekli bilgiler"
              key={form.key('description')}
              {...form.getInputProps('description')}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={create.isLoading}>
                Kaydet
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Button size="sm" px="lg" fz="sm" leftSection={<IconPlus size={18} color="white" />} onClick={open}>
        Yeni fiyat oluştur
      </Button>
    </Box>
  );
}
