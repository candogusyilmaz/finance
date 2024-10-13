import { Box, Button, Group, InputBase, Modal, MultiSelect, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IMaskInput } from 'react-imask';
import { api } from 'src/api/axios';
import { type ApiError, setInvalidParams } from 'src/api/types/Defaults';
import type { CreateOrganizationRequest } from 'src/api/types/OrganizationTypes';
import { type PartyRole, PartyRoles } from 'src/api/types/PartyTypes';
import { FieldErrorMessage } from 'src/utils/zod-messages';
import { z } from 'zod';

const schema = z.object({
  name: z.string(FieldErrorMessage('İsim')).trim().min(2, { message: 'Organizasyon adı en az 2 karakter olmalıdır.' }),
  address: z.string().optional(),
  taxOffice: z.string().optional(),
  taxRegistrationNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  roles: z.array(z.enum([PartyRoles.AFFILIATE, PartyRoles.SUPPLIER]), FieldErrorMessage('Tür'))
});

export default function CreateOrganizationModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: undefined!,
      address: undefined,
      taxOffice: undefined,
      taxRegistrationNumber: undefined,
      phoneNumber: undefined,
      email: undefined,
      roles: undefined! as PartyRole[]
    },
    validate: zodResolver(schema)
  });

  const create = useMutation({
    mutationFn: async (data: CreateOrganizationRequest) => {
      return await api.post('/organizations', data);
    },
    onSuccess(_data, variables) {
      notifications.show({
        message: `${variables.name} oluşturuldu.`,
        color: 'green'
      });
      form.reset();
      close();
      client.invalidateQueries({
        queryKey: ['organizations']
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

  return (
    <Box>
      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title="Yeni Organizasyon Oluştur"
        centered>
        <form
          onSubmit={form.onSubmit((s) => {
            create.mutate(s);
          })}>
          <Stack gap="md">
            <MultiSelect
              label="Tür"
              withAsterisk
              maxValues={1}
              placeholder="Organizasyon türü"
              data={[
                {
                  label: 'Organizasyon',
                  value: PartyRoles.AFFILIATE
                },
                {
                  label: 'Tedarikçi',
                  value: PartyRoles.SUPPLIER
                }
              ]}
              key={form.key('roles')}
              {...form.getInputProps('roles')}
            />
            <TextInput
              label="Organizasyon"
              placeholder="Organizasyon İsmi"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Group grow align="flex-start">
              <TextInput
                label="Vergi Dairesi"
                placeholder="Vergi Dairesi"
                key={form.key('taxOffice')}
                {...form.getInputProps('taxOffice')}
              />
              <TextInput
                label="Vergi Numarası"
                placeholder="Vergi Numarası"
                key={form.key('taxRegistrationNumber')}
                {...form.getInputProps('taxRegistrationNumber')}
              />
            </Group>
            <TextInput label="Adres" placeholder="Adres" key={form.key('address')} {...form.getInputProps('address')} />
            <Group grow align="flex-start">
              <InputBase
                label="Telefon"
                component={IMaskInput}
                placeholder="+90 000 000 0000"
                mask="+{9\0} 000 000 0000"
                key={form.key('phoneNumber')}
                {...form.getInputProps('phoneNumber')}
              />
              <TextInput label="Email" placeholder="abc@google.com" key={form.key('email')} {...form.getInputProps('email')} />
            </Group>
            <Group justify="flex-end" mt="md">
              <Button type="submit" loading={create.isPending}>
                Kaydet
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button size="sm" px="lg" fz="sm" leftSection={<IconPlus size={18} color="white" />} onClick={open}>
        Yeni organizasyon oluştur
      </Button>
    </Box>
  );
}
