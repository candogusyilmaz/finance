import { Box, Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import type { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'src/api/axios';
import { type ProblemDetail, setInvalidParams } from 'src/api/types/Defaults';
import EmployeeSelect from 'src/components/Dropdowns/EmployeeSelect';
import { z } from 'zod';

const worksiteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Ürün ismi 1 ila 255 karakter arasında olmalıdır.')
    .max(255, 'Ürün ismi 1 ila 255 karakter arasında olmalıdır.')
});

export default function CreateWorksiteModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      supervisorId: undefined
    },
    validate: zodResolver(worksiteSchema)
  });

  const create = useMutation({
    mutationFn: async (data: CreateWorksiteRequest) => {
      return await api.post('/worksites', data);
    },
    onSuccess(_data, variables) {
      notifications.show({
        message: `${variables.name} çalışma yeri başarıyla oluşturuldu.`,
        color: 'green'
      });
      close();
      client.invalidateQueries({
        queryKey: 'worksites'
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
    <Box w={30}>
      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title="Çalışma Yeri Hakkında"
        centered>
        <form onSubmit={form.onSubmit((data) => create.mutate(data))}>
          <Stack gap="md">
            <TextInput
              label="Çalışma Yeri"
              placeholder="Çalışma Yeri"
              withAsterisk
              key={form.key('name')}
              {...form.getInputProps('name')}
            />
            <EmployeeSelect
              label="Denetleyici"
              placeholder="Denetleyici"
              key={form.key('supervisorId')}
              {...form.getInputProps('supervisorId')}
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
