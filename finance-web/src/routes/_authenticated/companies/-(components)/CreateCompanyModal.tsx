import {
  Box,
  Button,
  Group,
  InputBase,
  Modal,
  Stack,
  TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IMaskInput } from 'react-imask';
import { useQueryClient } from 'react-query';
import { useCreateCompany } from 'src/api/Company';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Şirket adı en az 2 karakter olmalıdır.' }),
  address: z.string().optional(),
  taxOffice: z.string().optional(),
  taxRegistrationNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional()
});

export default function CreateCompanyModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      address: '',
      taxOffice: '',
      taxRegistrationNumber: '',
      phoneNumber: '',
      email: ''
    },
    validate: zodResolver(schema)
  });

  const create = useCreateCompany({
    onSuccess(_data, variables) {
      notifications.show({
        message: `${variables.name} şirketi başarıyla oluşturuldu.`,
        color: 'green'
      });
      close();
      client.invalidateQueries({
        queryKey: 'companies'
      });
    },
    onError(error, _variables, _context) {
      if (error.response?.data.detail) {
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
        title="Şirket Hakkında"
        centered
      >
        <form
          onSubmit={form.onSubmit((s) => {
            create.mutate(s);
          })}
        >
          <Stack gap="md">
            <TextInput
              label="Şirket"
              placeholder="Şirket İsmi"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <Group grow>
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
            <TextInput
              label="Adres"
              placeholder="Adres"
              key={form.key('address')}
              {...form.getInputProps('address')}
            />
            <Group grow>
              <InputBase
                label="Telefon"
                component={IMaskInput}
                placeholder="+90 000 000 0000"
                mask="+{9\0} 000 000 0000"
                key={form.key('phoneNumber')}
                {...form.getInputProps('phoneNumber')}
              />
              <TextInput
                label="Email"
                placeholder="abc@google.com"
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
            </Group>
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
