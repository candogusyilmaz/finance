import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  NumberInput,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TextInput,
  Textarea,
  Title
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconCalendar, IconCirclePlus, IconCircleX, IconTruckDelivery } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { api } from 'src/api/axios';
import { type ProblemDetail, createURL, setInvalidParams } from 'src/api/types/Defaults';
import {
  type CreateDeliveryItemRequest,
  type CreateDeliveryRequest,
  type DeliveryItemStatus,
  DeliveryItemStatusValues,
  type GetUndeliveredItemsReponse
} from 'src/api/types/DeliveryTypes';
import CurrencySelect from 'src/components/Dropdowns/CurrencySelect';
import PartySelect from 'src/components/Dropdowns/PartySelect';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import { StatusColorMap } from 'src/utils/color-helper';
import { FormatISODateTime } from 'src/utils/formatter';
import { FieldErrorMessage } from 'src/utils/zod-messages';
import { z } from 'zod';

export const Route = createFileRoute('/_authenticated/deliveries/new')({
  component: New,
  validateSearch: z.object({
    purchaseId: z.coerce.number().nullable().catch(null)
  })
});

const deliveryItemSchema = z.object({
  purchaseItemId: z.number().positive(),
  quantity: z.number(FieldErrorMessage('Ürün miktarı')).positive('Teslim edilecek ürün miktarı sıfırdan büyük olmalıdır.'),
  description: z.string().optional(),
  status: z.enum(DeliveryItemStatusValues)
});

const deliverySchema = z.object({
  senderId: z.coerce.number(FieldErrorMessage('Gönderici')),
  description: z.string().optional(),
  currencyId: z.coerce.number(FieldErrorMessage('Para birimi')),
  price: z.number(FieldErrorMessage('Tutar')).positive('Tutar pozitif olmalıdır.'),
  deliveryDate: z.coerce.date(FieldErrorMessage('Teslim tarihi')),
  deliveryItems: z.array(deliveryItemSchema).min(1, 'Teslim edilecek ürün sayısı en az 1 adet olmalıdır.'),
  shouldCreateInvoice: z.boolean()
});

function New() {
  const { purchaseId } = Route.useSearch();
  const client = useQueryClient();
  const navigate = Route.useNavigate();

  const form = useForm({
    mode: 'controlled', // if not set controlled then making changes to the form does not trigger re-render thus we cant get the product prices
    initialValues: {
      senderId: undefined!,
      description: undefined,
      currencyId: undefined!,
      price: undefined!,
      deliveryDate: new Date(),
      deliveryItems: [] as CreateDeliveryItemRequest[],
      shouldCreateInvoice: false
    },
    validate: zodResolver(deliverySchema),
    transformValues: (values): CreateDeliveryRequest => {
      return { ...values, deliveryDate: FormatISODateTime(values.deliveryDate) };
    }
  });

  const create = useMutation({
    mutationFn: async (data: CreateDeliveryRequest) => {
      return await api.post(`/purchases/${purchaseId}/deliveries`, data);
    },
    onSuccess() {
      notifications.show({
        message: 'Teslimat başarıyla kaydedildi.',
        color: 'green'
      });
      client.invalidateQueries({
        queryKey: ['purchases']
      });
      navigate({
        to: '/purchases',
        replace: true,
        search: {
          page: 1,
          size: 20,
          sort: { direction: 'desc', id: 'id' }
        }
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

  const addDeliveryItem = (di: CreateDeliveryItemRequest) => {
    const list = form.values.deliveryItems.filter((s) => s.purchaseItemId !== di.purchaseItemId);
    list.push(di);
    form.setFieldValue('deliveryItems', list);
  };

  const removeDeliveryItem = (purchaseItemId: number) => {
    form.setFieldValue(
      'deliveryItems',
      form.values.deliveryItems.filter((s) => s.purchaseItemId !== purchaseItemId)
    );
  };

  return (
    <Stack>
      <Group mb="lg">
        <IconTruckDelivery size={36} />
        <RouteTitle title="Yeni Teslimat" />
      </Group>
      <Group grow align="flex-start">
        <form onSubmit={form.onSubmit((data) => create.mutate(data))}>
          <Stack>
            <Title order={3}>Teslimat Bilgileri</Title>
            <Divider mb="md" />
            <Group grow align="flex-start">
              <DateInput
                label="Teslimat Tarihi"
                placeholder="GG/AA/YYYY"
                valueFormat="DD/MM/YYYY HH:mm"
                leftSection={<IconCalendar size={18} />}
                withAsterisk
                key={form.key('deliveryDate')}
                {...form.getInputProps('deliveryDate')}
              />
              <PartySelect
                partyRoles={[]}
                label="Gönderici"
                placeholder="Gönderici seçin"
                withAsterisk
                key={form.key('senderId')}
                {...form.getInputProps('senderId')}
              />
            </Group>
            <Group grow align="flex-start">
              <CurrencySelect withAsterisk key={form.key('currencyId')} {...form.getInputProps('currencyId')} />
              <NumberInput
                label="Fiyat"
                placeholder="Fiyat"
                min={0}
                withAsterisk
                hideControls
                thousandSeparator=","
                decimalSeparator="."
                decimalScale={2}
                key={form.key('price')}
                {...form.getInputProps('price')}
              />
            </Group>
            <Textarea
              label="Açıklama"
              autosize
              minRows={4}
              maxRows={5}
              placeholder="Teslimat ile ilgili açıklama"
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
            <Checkbox
              mt="sm"
              radius="sm"
              label="Bu teslimat için fatura oluştur."
              key={form.key('shouldCreateInvoice')}
              {...form.getInputProps('shouldCreateInvoice')}
            />
            <Divider mt="lg" label="Teslim Edilecek Ürünler" labelPosition="center" />

            <Stack>
              {form.errors.deliveryItems && (
                <Alert variant="light" color="red" icon={<IconAlertCircle size={16} />}>
                  {form.errors.deliveryItems}
                </Alert>
              )}
              <DeliveryItemsTable
                items={form.values.deliveryItems.map((s: CreateDeliveryItemRequest & { productName?: string }) => ({
                  deliveryQuantity: s.quantity,
                  deliveryStatus: s.status,
                  productName: s.productName,
                  purchaseItemId: s.purchaseItemId
                }))}
                removeDeliveryItem={removeDeliveryItem}
              />
            </Stack>

            <Group justify="space-between" mt="md" ml="auto">
              <Button type="submit">Oluştur</Button>
            </Group>
          </Stack>
        </form>
        <Stack>
          <Title order={3}>Teslimat Bekleyen Ürünler</Title>
          <Divider mb="md" />
          <RemainingItemsTable purchaseId={purchaseId} addDeliveryItem={addDeliveryItem} />
        </Stack>
      </Group>
    </Stack>
  );
}

function RemainingItemsTable({
  purchaseId,
  addDeliveryItem
}: Readonly<{ purchaseId: number | null; addDeliveryItem: (item: CreateDeliveryItemRequest) => void }>) {
  const query = useQuery({
    queryKey: ['purchases-undelivered-items', purchaseId],
    queryFn: async () => (await api.get<GetUndeliveredItemsReponse[]>(createURL(`purchases/${purchaseId}/undelivered-items`))).data,
    staleTime: 120000,
    enabled: !!purchaseId
  });

  if (!query.data || query.data.length === 0) {
    return (
      <Stack gap="xs">
        <Skeleton h={8} />
        <Skeleton h={8} />
        <Skeleton h={8} />
        <Skeleton h={8} />
        <Skeleton h={8} />
      </Stack>
    );
  }

  const rows = query.data.map((item) => (
    <Table.Tr key={item.purchaseItemId}>
      <Table.Td>{item.purchaseItemId}</Table.Td>
      <Table.Td>{item.productName}</Table.Td>
      <Table.Td align="right">{item.remainingQuantity}</Table.Td>
      <Table.Td align="right">
        <AddDeliveryItem item={item} addDeliveryItem={addDeliveryItem} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="sm">
      <Table striped highlightOnHover styles={{ table: { tableLayout: 'fixed' } }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={100}>#</Table.Th>
            <Table.Th>Ürün</Table.Th>
            <Table.Th w={110} ta="right">
              Kalan Miktar
            </Table.Th>
            <Table.Th w={50} />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}

function AddDeliveryItem({
  item,
  addDeliveryItem
}: Readonly<{ item: GetUndeliveredItemsReponse; addDeliveryItem: (item: CreateDeliveryItemRequest & { productName?: string }) => void }>) {
  const [opened, { open, close }] = useDisclosure(false);
  const { t } = useTranslation();

  const schema = z.object({
    quantity: z.coerce.number().positive(),
    description: z.string().optional(),
    status: z.enum(DeliveryItemStatusValues, {
      ...FieldErrorMessage('Durum')
    })
  });

  const deliveryItemForm = useForm<CreateDeliveryItemRequest>({
    mode: 'uncontrolled',
    initialValues: {
      purchaseItemId: item.purchaseItemId,
      quantity: 1,
      description: undefined,
      status: undefined! as DeliveryItemStatus
    },
    validate: zodResolver(schema)
  });

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => {
          deliveryItemForm.reset();
          close();
        }}
        title="Ürün Teslimatı Ekle">
        <form
          onSubmit={deliveryItemForm.onSubmit((data) => {
            addDeliveryItem({ ...data, productName: item.productName });
            deliveryItemForm.reset();
            close();
          })}>
          <Stack>
            <TextInput label="Ürün" readOnly value={item.productName} />
            <Group grow align="flex-start">
              <Select
                label="Durum"
                placeholder="Durum seçiniz"
                withAsterisk
                data={DeliveryItemStatusValues.map((s) => ({ label: t(s), value: s }))}
                key={deliveryItemForm.key('status')}
                {...deliveryItemForm.getInputProps('status')}
              />
              <NumberInput
                label="Miktar"
                placeholder="Miktar"
                min={1}
                max={item.remainingQuantity}
                withAsterisk
                key={deliveryItemForm.key('quantity')}
                {...deliveryItemForm.getInputProps('quantity')}
              />
            </Group>
            <Textarea
              label="Açıklama"
              placeholder="Ürün teslimatı ile ilgili notlar"
              key={deliveryItemForm.key('description')}
              {...deliveryItemForm.getInputProps('description')}
            />
            <Button type="submit">Ekle</Button>
          </Stack>
        </form>
      </Modal>
      <ActionIcon onClick={open} variant="subtle" color="green">
        <IconCirclePlus size={18} />
      </ActionIcon>
    </>
  );
}

function DeliveryItemsTable({
  items,
  removeDeliveryItem
}: Readonly<{
  items: {
    purchaseItemId: number;
    productName?: string;
    deliveryQuantity: number;
    deliveryStatus: DeliveryItemStatus;
  }[];
  removeDeliveryItem: (purchaseItemId: number) => void;
}>) {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <Stack gap="xs">
        <Skeleton h={8} />
        <Skeleton h={8} />
        <Skeleton h={8} />
        <Skeleton h={8} />
      </Stack>
    );
  }

  const rows = items.map((item) => (
    <Table.Tr key={item.purchaseItemId}>
      <Table.Td>{item.purchaseItemId}</Table.Td>
      <Table.Td>{item.productName}</Table.Td>
      <Table.Td>
        <Badge color={StatusColorMap[item.deliveryStatus]}>{t(item.deliveryStatus)}</Badge>
      </Table.Td>
      <Table.Td align="right">{item.deliveryQuantity}</Table.Td>
      <Table.Td align="right">
        <ActionIcon variant="subtle" color="red" onClick={() => removeDeliveryItem(item.purchaseItemId)}>
          <IconCircleX size={20} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="sm">
      <Table striped highlightOnHover styles={{ table: { tableLayout: 'fixed' } }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={100}>#</Table.Th>
            <Table.Th>Ürün</Table.Th>
            <Table.Th w={120}>Durum</Table.Th>
            <Table.Th w={80} ta="right">
              Miktar
            </Table.Th>
            <Table.Th w={50} />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
