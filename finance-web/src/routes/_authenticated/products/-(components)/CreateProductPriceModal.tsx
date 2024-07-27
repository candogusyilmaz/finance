import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  Textarea
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconCash, IconReceiptTax } from '@tabler/icons-react';
import type { AxiosError } from 'axios';
import { formatISO } from 'date-fns';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'src/api/axios';
import { type ProblemDetail, setInvalidParams } from 'src/api/types/Defaults';
import type { CreateProductPriceRequest } from 'src/api/types/ProductPriceTypes';
import CompanySelect from 'src/components/CompanySelect';
import CurrencySelect from 'src/components/CurrencySelect';
import EmployeeSelect from 'src/components/EmployeeSelect';
import ProductSelect from 'src/components/ProductSelect';
import { ConvertToNumber } from 'src/utils/utils';
import { z } from 'zod';

const productPriceSchema = z
  .object({
    productId: z.string().min(1, 'Ürün seçilmelidir.'),
    currencyId: z.string({ required_error: 'Para birimi seçilmelidir.' }),
    price: z.number({ required_error: 'Fiyat 0 veya daha büyük olmalıdır.' }),
    startDate: z.date({ required_error: 'Başlangıç tarihi gereklidir.' }),
    endDate: z.date({ required_error: 'Bitiş tarihi gereklidir.' }),
    subcontractorId: z.string().optional(),
    priceConfirmedById: z.string().optional(),
    vatRate: z
      .number()
      .min(0, 'En az 0 olabilir.')
      .max(100, 'En fazla 100 olabilir.')
      .optional(),
    withholdingTaxRate: z
      .number()
      .min(0, 'En az 0 olabilir.')
      .max(100, 'En fazla 100 olabilir.')
      .optional(),
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

export default function CreateProductPriceModal({
  productId
}: Readonly<{ productId: number }>) {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState<
    string | undefined
  >();

  const form = useForm({
    initialValues: {
      productId: productId.toString(),
      currencyId: undefined!,
      price: undefined!,
      startDate: undefined!,
      endDate: undefined!,
      subcontractorId: '' as string | undefined,
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
      subcontractorId: ConvertToNumber(values.subcontractorId),
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
        message: 'Ürün fiyatı başarıyla oluşturuldu.',
        color: 'green'
      });
      form.reset();
      close();
      client.invalidateQueries({
        queryKey: `product-${variables.productId}-prices`
      });
    },
    onError(error: AxiosError<ProblemDetail>, _variables, _context) {
      const invalidParams = setInvalidParams(
        error.response?.data,
        (field, msg) => form.setFieldError(field, msg)
      );

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
        centered
      >
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
                onCurrencyChange={(opt) =>
                  setSelectedCurrencySymbol(opt?.symbol)
                }
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
            <CompanySelect
              label="Taşeron"
              placeholder="Taşeron"
              key={form.key('subcontractorId')}
              {...form.getInputProps('subcontractorId')}
            />
            <EmployeeSelect
              label="Onaylayan"
              placeholder="Fiyat teyit alınan kişi"
              key={form.key('priceConfirmedById')}
              {...form.getInputProps('priceConfirmedById')}
            />
            <Group grow align="flex-start">
              <NumberInput
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
      <Button onClick={open} tt="uppercase">
        Oluştur
      </Button>
    </Box>
  );
}
