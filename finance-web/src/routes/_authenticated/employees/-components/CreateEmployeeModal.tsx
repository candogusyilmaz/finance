import { Box, Button, Group, Modal, NumberInput, Stack, TextInput, rem } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconCash, IconPlus } from '@tabler/icons-react';
import type { AxiosError } from 'axios';
import { formatISO } from 'date-fns';
import { useMutation, useQueryClient } from 'react-query';
import { api } from 'src/api/axios';
import { type ProblemDetail, setInvalidParams } from 'src/api/types/Defaults';
import CurrencySelect from 'src/components/Dropdowns/CurrencySelect';
import ProfessionMultiSelect from 'src/components/Dropdowns/ProfessionMultiSelect';
import WorksiteSelect from 'src/components/Dropdowns/WorksiteSelect';
import { z } from 'zod';

const employeeSchema = z.object({
  individual: z.object({
    socialSecurityNumber: z.string().min(1, 'Kimlik numarası gereklidir.'),
    firstName: z.string().min(1, 'Ad gereklidir.'),
    lastName: z.string().min(1, 'Soyad gereklidir.'),
    birthDate: z.date({
      required_error: 'İşe başlama tarihi gereklidir.'
    })
  }),
  professionIds: z.array(z.string()).min(1, 'En az bir meslek gereklidir.'),
  officialEmploymentStartDate: z.date({
    required_error: 'Resmi işe başlama tarihi gereklidir.'
  }),
  employmentStartDate: z.date({
    required_error: 'İşe başlama tarihi gereklidir.'
  }),
  salary: z.object({
    amount: z.number({ required_error: 'Maaş tutarı gereklidir.' }).positive('Maaş tutarı pozitif olmalıdır.'),
    currencyId: z.string({ required_error: 'Para birimi seçilmelidir.' }),
    startDate: z.date({ required_error: 'Maaş başlangıç tarihi gereklidir.' })
  })
});

export default function CreateEmployeeModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const client = useQueryClient();

  const form = useForm<CreateEmployeeRequest>({
    mode: 'uncontrolled',
    validate: zodResolver(employeeSchema),
    initialValues: {
      individual: {
        socialSecurityNumber: '',
        firstName: '',
        lastName: '',
        birthDate: undefined!
      },
      employmentStartDate: undefined!,
      officialEmploymentStartDate: undefined!,
      worksiteId: undefined,
      professionIds: [],
      salary: {
        amount: undefined!,
        currencyId: undefined!,
        startDate: undefined!
      }
    },
    transformValues: (values) => {
      values.individual.birthDate = formatISO(values.individual.birthDate, {
        representation: 'date'
      });
      values.employmentStartDate = formatISO(values.officialEmploymentStartDate, { representation: 'date' });
      values.officialEmploymentStartDate = formatISO(values.officialEmploymentStartDate, { representation: 'date' });
      values.salary.startDate = formatISO(values.salary.startDate, {
        representation: 'date'
      });

      return values;
    }
  });

  const create = useMutation({
    mutationFn: async (data: CreateEmployeeRequest) => {
      return await api.post('/employees', data);
    },
    onSuccess(_data, variables) {
      notifications.show({
        message: `${variables.individual.firstName} ${variables.individual.lastName} isimli personel başarıyla oluşturuldu.`,
        color: 'green'
      });
      close();
      client.invalidateQueries({
        queryKey: 'employees'
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
        size={rem(600)}
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title="Personel Hakkında"
        centered>
        <form onSubmit={form.onSubmit((data) => create.mutate(data))}>
          <Stack gap="md">
            <Group grow align="flex-start">
              <TextInput label="Ad" placeholder="John" withAsterisk {...form.getInputProps('individual.firstName')} />
              <TextInput label="Soyad" placeholder="Doe" withAsterisk {...form.getInputProps('individual.lastName')} />
            </Group>
            <Group grow align="flex-start">
              <TextInput
                label="Kimlik Numarası"
                placeholder="12345678901"
                withAsterisk
                {...form.getInputProps('individual.socialSecurityNumber')}
              />
              <DateInput
                label="Doğum Tarihi"
                placeholder="gün/ay/yıl"
                withAsterisk
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={18} />}
                {...form.getInputProps('individual.birthDate')}
              />
            </Group>
            <Group grow align="flex-start">
              <ProfessionMultiSelect label="Meslekler" placeholder="Meslek seçiniz" withAsterisk {...form.getInputProps('professionIds')} />
              <WorksiteSelect label="Çalışma Yeri" placeholder="Urla" {...form.getInputProps('worksiteId')} />
            </Group>
            <Group grow align="flex-start">
              <DateInput
                label="İşe Başlama Tarihi"
                placeholder="gün/ay/yıl"
                withAsterisk
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={18} />}
                {...form.getInputProps('employmentStartDate')}
              />
              <DateInput
                label="Resmi İşe Başlama Tarihi"
                placeholder="gün/ay/yıl"
                withAsterisk
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={18} />}
                {...form.getInputProps('officialEmploymentStartDate')}
              />
            </Group>
            <Group grow align="flex-start">
              <DateInput
                label="Maaş Başlangıç Tarihi"
                placeholder="gün/ay/yıl"
                withAsterisk
                valueFormat="DD/MM/YYYY"
                leftSection={<IconCalendar size={18} />}
                {...form.getInputProps('salary.startDate')}
              />
              <NumberInput
                label="Maaş"
                thousandSeparator=","
                placeholder="5,000"
                withAsterisk
                leftSection={<IconCash size={18} />}
                hideControls
                allowNegative={false}
                {...form.getInputProps('salary.amount')}
              />
              <CurrencySelect label="Para Birimi" placeholder="TRY" withAsterisk width="20%" {...form.getInputProps('salary.currencyId')} />
            </Group>
            <Group justify="flex-end" mt="md">
              <Button type="submit">Kaydet</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button size="sm" px="lg" fz="sm" leftSection={<IconPlus size={18} color="white" />} onClick={open}>
        Yeni personel oluştur
      </Button>
    </Box>
  );
}
