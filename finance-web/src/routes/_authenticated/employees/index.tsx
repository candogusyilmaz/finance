import { Group, Stack } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { RouteTitle } from 'src/components/RouteTitle';

export const Route = createFileRoute('/_authenticated/employees/')({
  component: Employees,
  validateSearch: PageSchema
});

function Employees() {
  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center">
        <RouteTitle>Personeller</RouteTitle>
      </Group>
    </Stack>
  );
}
