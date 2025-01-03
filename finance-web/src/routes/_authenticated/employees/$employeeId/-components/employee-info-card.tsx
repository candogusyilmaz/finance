import { ActionIcon, Avatar, Divider, Group, LoadingOverlay, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDotsVertical, IconIdBadge } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Navigate } from '@tanstack/react-router';
import { type ID, PageSchema } from 'src/api/types/Defaults';
import { getEmployeeQueryOptions } from '../-api/employee-details-queries';

export function EmployeeInfoCard({ employeeId }: Readonly<{ employeeId: ID }>) {
  const { data, isError, isFetching } = useQuery(getEmployeeQueryOptions(employeeId));

  if (isError) return <Navigate to="/employees" replace search={PageSchema.parse} />;

  return (
    <Paper withBorder p="md" pos="relative">
      <LoadingOverlay visible={isFetching} bg="gray.4" />
      <Stack>
        <Group gap="xs">
          <IconIdBadge size={24} />
          <Title order={3}>Personel</Title>
          <ActionIcon size="lg" radius="sm" variant="subtle" ml="auto" color="gray">
            <IconDotsVertical size={22} />
          </ActionIcon>
        </Group>
        <Group align="center">
          <Avatar size="lg" radius="md" color="initials" name={data?.name} />
          <Stack gap={0}>
            <Text size="xl" fw={700} tt="capitalize">
              {data?.name}
            </Text>
            <Text size="xs" c="dimmed">
              {data?.socialSecurityNumber}
            </Text>
          </Stack>
        </Group>
        <Group gap="xl">
          <Stack gap={5}>
            <Text size="md" c="dimmed" fw={500}>
              Organizasyon
            </Text>
            <Text fw={600}>{data?.currentOrganization?.name ?? '-'}</Text>
          </Stack>
          <Divider orientation="vertical" />
          <Stack gap={5}>
            <Text size="md" c="dimmed" fw={500}>
              Çalışma Yeri
            </Text>
            <Text fw={600}>{data?.currentWorksite?.name ?? '-'}</Text>
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
}
