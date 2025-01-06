import { Button, Group, NumberInput, Stack, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconCash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/axios';
import type { CreateEmployeeRequest } from 'src/api/types/EmployeeTypes';
import { CurrencySelect } from 'src/components/selects/currency-select';
import { OrganizationSelect } from 'src/components/selects/organization-select';
import { ProfessionSelect } from 'src/components/selects/profession-select';
import { WorksiteSelect } from 'src/components/selects/worksite-select';
import { useFormMutation } from 'src/hooks/use-form-mutation';
import { FormatISODate } from 'src/utils/formatter';
import { FieldErrorMessage } from 'src/utils/zod-messages';
import { z } from 'zod';

const employeeSchema = z.object({
  individual: z.object({
    socialSecurityNumber: z.string(FieldErrorMessage('Kimlik numarası')).min(1, { message: '' }),
    firstName: z.string(FieldErrorMessage('Ad')).min(1, { message: FieldErrorMessage('Ad').required_error }),
    lastName: z.string(FieldErrorMessage('Soyad')).min(1, { message: FieldErrorMessage('Soyad').required_error }),
    birthDate: z.date(FieldErrorMessage('Doğum tarihi'))
  }),
  worksiteId: z.string().optional(),
  professionId: z.string(FieldErrorMessage('Meslek')),
  organizationId: z.string(FieldErrorMessage('Organizasyon')),
  employmentStartDate: z.date(FieldErrorMessage('İşe başlama tarihi')),
  officialEmploymentStartDate: z.date(FieldErrorMessage('Resmi işe başlama tarihi')),
  salary: z.object({
    amount: z.number(FieldErrorMessage('Maaş tutarı')).positive('Maaş tutarı pozitif olmalıdır.'),
    currencyId: z.string(FieldErrorMessage('Para birimi')),
    startDate: z.date(FieldErrorMessage('Maaş başlangıç tarihi'))
  })
});

interface CreateEmployeeFormProps {
  onSuccess?: () => void;
}

export function CreateEmployeeForm(props: CreateEmployeeFormProps) {
  const client = useQueryClient();

  const form = useForm({
    mode: 'uncontrolled',
    validate: zodResolver(employeeSchema),
    initialValues: {
      individual: {
        socialSecurityNumber: '',
        firstName: '',
        lastName: '',
        birthDate: undefined!
      },
      organizationId: undefined!,
      employmentStartDate: undefined!,
      officialEmploymentStartDate: undefined!,
      worksiteId: undefined,
      professionId: undefined,
      salary: {
        amount: undefined!,
        currencyId: undefined!,
        startDate: undefined!
      }
    },
    transformValues: (values) => {
      const res = JSON.parse(JSON.stringify(values));

      res.individual.birthDate = FormatISODate(res.individual.birthDate);
      res.employmentStartDate = FormatISODate(res.officialEmploymentStartDate);
      res.officialEmploymentStartDate = FormatISODate(res.officialEmploymentStartDate);
      res.salary.startDate = FormatISODate(res.salary.startDate);

      return res;
    }
  });

  const create = useFormMutation(form, {
    mutationFn: (data: CreateEmployeeRequest) => api.post('/employees', data),
    onSuccess: (_, variables) => {
      notifications.show({
        message: `${variables.individual.firstName} ${variables.individual.lastName} isimli personel oluşturuldu.`,
        color: 'green'
      });
      client.invalidateQueries({ queryKey: ['employees'] });
      props.onSuccess?.();
    }
  });

  return (
    <form onSubmit={form.onSubmit((data) => create.mutate(data))}>
      <Stack gap="xs">
        <Group grow align="flex-start">
          <TextInput label="Ad" placeholder="John" withAsterisk {...form.getInputProps('individual.firstName')} />
          <TextInput label="Soyad" placeholder="Smith" withAsterisk {...form.getInputProps('individual.lastName')} />
        </Group>
        <OrganizationSelect
          label="Organizasyon"
          placeholder="Organizasyon seçiniz"
          withAsterisk
          {...form.getInputProps('organizationId')}
        />
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
        <ProfessionSelect label="Meslekler" placeholder="Meslek seçiniz" withAsterisk {...form.getInputProps('professionId')} />
        <WorksiteSelect label="Çalışma Yeri" placeholder="Urla" {...form.getInputProps('worksiteId')} />
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
        <DateInput
          label="Maaş Başlangıç Tarihi"
          placeholder="gün/ay/yıl"
          withAsterisk
          valueFormat="DD/MM/YYYY"
          leftSection={<IconCalendar size={18} />}
          {...form.getInputProps('salary.startDate')}
        />
        <Group grow align="flex-start">
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
        <Button mt="sm" w={140} type="submit" ml="auto">
          Kaydet
        </Button>
      </Stack>
    </form>
  );
}
