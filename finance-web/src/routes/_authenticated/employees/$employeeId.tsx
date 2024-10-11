import {
  ActionIcon,
  Avatar,
  Badge,
  Divider,
  Flex,
  Grid,
  Group,
  Loader,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Tabs,
  Text,
  Title
} from '@mantine/core';
import { IconDotsVertical, IconIdBadge } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { isAfter } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import type {
  GetEmployeeAssignmentResponse,
  GetEmployeeEmploymentResponse,
  GetEmployeePaymentResponse,
  GetEmployeeResponse,
  GetEmployeeSalaryResponse
} from 'src/api/types/EmployeeTypes';
import { StatusColorMap } from 'src/utils/color-helper';
import { FormatDate, FormatDateTime, FormatPrice } from 'src/utils/formatter';

export const Route = createFileRoute('/_authenticated/employees/$employeeId')({
  component: Employee
});

function Employee() {
  const { employeeId } = Route.useParams();

  return (
    <Grid>
      <Grid.Col span={{ sm: 12, md: 8 }}>
        <EmployeeInfoCard employeeId={employeeId} />
      </Grid.Col>
      <Grid.Col span={{ sm: 12, md: 8 }}>
        <Tabs
          keepMounted={false}
          defaultValue="employments"
          styles={{
            list: {
              marginBottom: 'var(--mantine-spacing-md)'
            }
          }}>
          <Tabs.List>
            <Tabs.Tab value="employments">Organizasyon</Tabs.Tab>
            <Tabs.Tab value="assignments">Çalışma Yeri</Tabs.Tab>
            <Tabs.Tab value="salaries">Ücret</Tabs.Tab>
            <Tabs.Tab value="payments">Ödeme</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="employments">
            <EmployeeEmploymentHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
          <Tabs.Panel value="assignments">
            <EmployeeAssignmentHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
          <Tabs.Panel value="salaries">
            <EmployeeSalaryHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
          <Tabs.Panel value="payments">
            <EmployeePaymentHistoryTable employeeId={employeeId} />
          </Tabs.Panel>
        </Tabs>
      </Grid.Col>
    </Grid>
  );
}

function EmployeeInfoCard({ employeeId }: Readonly<{ employeeId: string }>) {
  const { data: employee, isFetching } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: async () => (await api.get<GetEmployeeResponse>(`/employees/${employeeId}`)).data,
    cacheTime: 120000,
    staleTime: 120000
  });

  if (isFetching) {
    return (
      <Paper withBorder>
        <Flex h={220} justify="center" align="center">
          <Loader />
        </Flex>
      </Paper>
    );
  }

  if (!employee) return <>Not found anything?</>;

  return (
    <Paper withBorder p="md">
      <Stack>
        <Group gap="xs">
          <IconIdBadge size={24} />
          <Title order={3}>Personel</Title>
          <ActionIcon size="lg" radius="sm" variant="subtle" ml="auto" color="gray">
            <IconDotsVertical size={22} />
          </ActionIcon>
        </Group>
        <Group align="center">
          <Avatar size="lg" radius="md" color="initials" name={employee.name} />
          <Stack gap={0}>
            <Text size="xl" fw={700} tt="capitalize">
              {employee.name}
            </Text>
            <Text size="xs" c="dimmed">
              {employee.socialSecurityNumber}
            </Text>
          </Stack>
        </Group>
        <Group gap="xl">
          <Stack gap={5}>
            <Text size="md" c="dimmed" fw={500}>
              Organizasyon
            </Text>
            <Text fw={600}>{employee.currentOrganization?.name ?? '-'}</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={5}>
            <Text size="md" c="dimmed" fw={500}>
              Çalışma Yeri
            </Text>
            <Text fw={600}>{employee.currentWorksite?.name ?? '-'}</Text>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
}

function EmployeeSalaryHistoryTable({ employeeId }: Readonly<{ employeeId: string }>) {
  const { data, isFetching } = useQuery({
    queryKey: ['employee-salaries', employeeId],
    queryFn: async () => {
      const result = (await api.get<GetEmployeeSalaryResponse[]>(`/employees/${employeeId}/salaries`)).data;

      result.sort((a, b) => (isAfter(a.effectivePeriod.startDate, b.effectivePeriod.startDate) ? -1 : 1));

      return result;
    },
    cacheTime: 120000,
    staleTime: 120000
  });

  if (isFetching) {
    return (
      <Paper withBorder>
        <Flex h={400} justify="center" align="center">
          <Loader />
        </Flex>
      </Paper>
    );
  }

  const rows = data?.map((s) => (
    <Table.Tr key={s.id}>
      <Table.Td>
        <Text size="sm"> {FormatPrice(s.wage, s.currency.code)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {FormatDate(s.effectivePeriod.startDate)} - {FormatDate(s.effectivePeriod.endDate)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{s.createdBy.name}</Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.createdBy.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{s.updatedBy.name}</Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.updatedBy.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="xs">
      <ScrollArea
        h={400}
        styles={{
          scrollbar: {
            marginTop: 35,
            background: 'transparent'
          }
        }}>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr
              styles={{
                tr: {
                  backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))'
                }
              }}>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Ücret
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Geçerlilik Süresi
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Oluşturulma
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Son Güncellenme
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

function EmployeeEmploymentHistoryTable({ employeeId }: Readonly<{ employeeId: string }>) {
  const { data, isFetching } = useQuery({
    queryKey: ['employee-employments', employeeId],
    queryFn: async () => {
      const result = (await api.get<GetEmployeeEmploymentResponse[]>(`/employees/${employeeId}/employments`)).data;

      result.sort((a, b) => (isAfter(a.actualEmploymentPeriod.startDate, b.actualEmploymentPeriod.startDate) ? -1 : 1));

      return result;
    },
    cacheTime: 120000,
    staleTime: 120000
  });

  if (isFetching) {
    return (
      <Paper withBorder>
        <Flex h={400} justify="center" align="center">
          <Loader />
        </Flex>
      </Paper>
    );
  }

  const rows = data?.map((s) => (
    <Table.Tr key={s.id}>
      <Table.Td>
        <Text size="sm">{s.organization.name}</Text>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{FormatDate(s.actualEmploymentPeriod.startDate)}</Text>
          <Text size="sm">{FormatDate(s.actualEmploymentPeriod.endDate, { fallbackValue: '-' })}</Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{FormatDate(s.formalEmploymentPeriod.startDate)}</Text>
          <Text size="sm">{FormatDate(s.formalEmploymentPeriod.endDate, { fallbackValue: '-' })}</Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{s.createdBy.name}</Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.createdBy.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{s.updatedBy.name}</Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.updatedBy.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="xs">
      <ScrollArea
        h={400}
        styles={{
          scrollbar: {
            marginTop: 35,
            background: 'transparent'
          }
        }}>
        <Table highlightOnHover>
          <Table.Thead
            styles={{
              thead: {}
            }}>
            <Table.Tr
              styles={{
                tr: {
                  backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))'
                }
              }}>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Organizasyon
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Geçerlilik Süresi
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Resmi Geçerlilik Süresi
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Oluşturulma
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Son Güncellenme
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

function EmployeeAssignmentHistoryTable({ employeeId }: Readonly<{ employeeId: string }>) {
  const { data, isFetching } = useQuery({
    queryKey: ['employee-assignments', employeeId],
    queryFn: async () => {
      const result = (await api.get<GetEmployeeAssignmentResponse[]>(`/employees/${employeeId}/assignments`)).data;

      result.sort((a, b) => (isAfter(a.period.startDate, b.period.startDate) ? -1 : 1));

      return result;
    },
    cacheTime: 120000,
    staleTime: 120000
  });

  if (isFetching) {
    return (
      <Paper withBorder>
        <Flex h={400} justify="center" align="center">
          <Loader />
        </Flex>
      </Paper>
    );
  }

  const rows = data?.map((s) => (
    <Table.Tr key={s.id}>
      <Table.Td>
        <Text size="sm">{s.worksite.name}</Text>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{FormatDate(s.period.startDate)}</Text>
          <Text size="sm">{FormatDate(s.period.endDate, { fallbackValue: '-' })}</Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{s.createdBy.name}</Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.createdBy.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm">{s.updatedBy.name}</Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.updatedBy.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="xs">
      <ScrollArea
        h={400}
        styles={{
          scrollbar: {
            marginTop: 35,
            background: 'transparent'
          }
        }}>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr
              styles={{
                tr: {
                  backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))'
                }
              }}>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Çalışma Yeri
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Geçerlilik Süresi
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Oluşturulma
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Son Güncellenme
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}

function EmployeePaymentHistoryTable({ employeeId }: Readonly<{ employeeId: string }>) {
  const { t } = useTranslation();
  const { data, isFetching } = useQuery({
    queryKey: ['employee-payments', employeeId],
    queryFn: async () => {
      const result = (await api.get<GetEmployeePaymentResponse[]>(`/employees/${employeeId}/payments`)).data;

      result.sort((a, b) => (isAfter(a.date, b.date) ? -1 : 1));

      return result;
    },
    cacheTime: 120000,
    staleTime: 120000
  });

  if (isFetching) {
    return (
      <Paper withBorder>
        <Flex h={400} justify="center" align="center">
          <Loader />
        </Flex>
      </Paper>
    );
  }

  const rows = data?.map((s) => (
    <Table.Tr key={s.id}>
      <Table.Td>
        <Text size="sm">{s.toParty.id.toString() === employeeId ? s.fromParty.name : s.toParty.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{FormatDate(s.date)}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c={s.toParty.id.toString() === employeeId ? 'green.6' : 'red.5'}>
          {FormatPrice(s.money.amount, s.money.currencyCode)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge variant="dot" tt="capitalize" color={StatusColorMap[s.status.status]}>
          {t(s.status.status)}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Stack gap={0}>
          <Text size="sm" c="dark.0">
            {s.status.audit.name}
          </Text>
          <Text size="xs" c="dimmed">
            {FormatDateTime(s.status.audit.time, { dateStyle: 'medium' })}
          </Text>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius="xs">
      <ScrollArea
        h={400}
        styles={{
          scrollbar: {
            marginTop: 35,
            background: 'transparent'
          }
        }}>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr
              styles={{
                tr: {
                  backgroundColor: 'light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))'
                }
              }}>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Taraf
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Tarih
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Tutar
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Durum
                </Text>
              </Table.Th>
              <Table.Th>
                <Text size="sm" fw={600}>
                  Son İşlem
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
