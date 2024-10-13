import { Box, Button, Group, Modal, NumberInput, Stack, TextInput, rem } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconCash, IconPlus } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { formatISO } from 'date-fns';
import { api } from 'src/api/axios';
import { type ProblemDetail, setInvalidParams } from 'src/api/types/Defaults';
import type { CreateEmployeeRequest } from 'src/api/types/EmployeeTypes';
import CurrencySelect from 'src/components/Dropdowns/CurrencySelect';
import PartySelect from 'src/components/Dropdowns/PartySelect';
import ProfessionMultiSelect from 'src/components/Dropdowns/ProfessionMultiSelect';
import WorksiteSelect from 'src/components/Dropdowns/WorksiteSelect';
import { FieldErrorMessage } from 'src/utils/zod-messages';
import { z } from 'zod';

const employeeSchema = z.object({
  individual: z.object({
    socialSecurityNumber: z.string(FieldErrorMessage('Kimlik numarası')),
    name: z.string(FieldErrorMessage('Ad Soyad')),
    birthDate: z.coerce.date(FieldErrorMessage('Doğum tarihi'))
  }),
  organizationId: z.string(FieldErrorMessage('Organizasyon')),
  professionIds: z.array(z.string()).min(1, 'En az bir meslek gereklidir.'),
  officialEmploymentStartDate: z.coerce.date({
    required_error: 'Resmi işe başlama tarihi gereklidir.'
  }),
  employmentStartDate: z.coerce.date({
    required_error: 'İşe başlama tarihi gereklidir.'
  }),
  salary: z.object({
    amount: z.number({ required_error: 'Maaş tutarı gereklidir.' }).positive('Maaş tutarı pozitif olmalıdır.'),
    currencyId: z.string({ required_error: 'Para birimi seçilmelidir.' }),
    startDate: z.coerce.date({ required_error: 'Maaş başlangıç tarihi gereklidir.' })
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
        name: '',
        birthDate: undefined!
      },
      organizationId: undefined!,
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
        message: `${variables.individual.name} isimli personel oluşturuldu.`,
        color: 'green'
      });
      close();
      client.invalidateQueries({
        queryKey: ['employees']
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
              <PartySelect
                partyRoles={['ORGANIZATION', 'AFFILIATE']}
                label="Organizasyon"
                placeholder="Organizasyon seçiniz"
                withAsterisk
                {...form.getInputProps('organizationId')}
              />
              <TextInput label="Ad Soyad" placeholder="John" withAsterisk {...form.getInputProps('individual.name')} />
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
