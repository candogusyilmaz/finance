import {
  Box,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
  Textarea
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import type { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'src/api/axios';
import { setInvalidParams, type ProblemDetail } from 'src/api/types/Defaults';
import type {
  CreateProductRequest,
  ProductType
} from 'src/api/types/ProductTypes';
import ProductCategorySelect from 'src/components/ProductCategorySelect';
import ProductUnitSelect from 'src/components/ProductUnitSelect';
import { z } from 'zod';

const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Ürün ismi 1 ila 255 karakter arasında olmalıdır.')
    .max(255, 'Ürün ismi 1 ila 255 karakter arasında olmalıdır.'),
  description: z.string().optional(),
  productType: z.enum(['SERVICE', 'PRODUCT'], {
    message: 'Ürün tipi "Ürün" veya "Hizmet" olmalıdır.'
  }),
  productUnitId: z.string().optional(),
  productCategoryId: z.string().optional()
});

export default function CreateProductModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      productUnitId: '',
      productType: '' as ProductType,
      productCategoryId: ''
    },
    validate: zodResolver(productSchema),
    transformValues(values) {
      return {
        ...values,
        productUnitId: values.productUnitId
          ? Number.parseInt(values.productUnitId)
          : undefined,
        productCategoryId: values.productCategoryId
          ? Number.parseInt(values.productCategoryId)
          : undefined
      };
    }
  });

  const create = useMutation({
    mutationFn: async (data: CreateProductRequest) => {
      return await api.post('/products', data);
    },
    onSuccess(_data, variables) {
      notifications.show({
        message: `${variables.name} ürünü başarıyla oluşturuldu.`,
        color: 'green'
      });
      close();
      client.invalidateQueries({
        queryKey: 'products'
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
    <Box w={30}>
      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title="Ürün Hakkında"
        centered
      >
        <form onSubmit={form.onSubmit((data) => create.mutate(data))}>
          <Stack gap="md">
            <Select
              label="Ürün Tipi"
              placeholder="Ürün veya Hizmet"
              data={[
                { value: 'PRODUCT', label: 'Ürün' },
                { value: 'SERVICE', label: 'Hizmet' }
              ]}
              withAsterisk
              key={form.key('productType')}
              {...form.getInputProps('productType')}
            />

            <TextInput
              label="Ürün"
              placeholder="Ürün Adı"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Group grow>
              <ProductUnitSelect
                key={form.key('productUnitId')}
                {...form.getInputProps('productUnitId')}
              />
              <ProductCategorySelect
                key={form.key('productCategoryId')}
                {...form.getInputProps('productCategoryId')}
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
