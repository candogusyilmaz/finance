import { Group, Select, Stack } from '@mantine/core';
import { IconBuilding, IconBuildingCommunity } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { type PartyRole, PartyRoles } from 'src/api/types/PartyTypes';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import { z } from 'zod';
import CreateOrganizationModal from './-components/CreateOrganizationModal';
import OrganizationsTable from './-components/OrganizationsTable';

export const Route = createFileRoute('/_authenticated/organizations/')({
  component: Organizations,
  validateSearch: PageSchema.extend({
    role: z.enum([PartyRoles.AFFILIATE, PartyRoles.SUPPLIER]).catch(PartyRoles.ORGANIZATION)
  })
});

function Organizations() {
  const navigate = Route.useNavigate();

  return (
    <Stack h="100%" w="100%" gap="lg">
      <Group align="center" mb="lg">
        <IconBuildingCommunity size={36} />
        <RouteTitle title="Organizasyonlar" />
      </Group>
      <Stack>
        <Group justify="space-between">
          <Select
            leftSection={<IconBuilding size={18} />}
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
            defaultValue={PartyRoles.AFFILIATE}
            allowDeselect={false}
            onChange={(value) =>
              navigate({
                search: (prev) => ({ ...prev, role: value as PartyRole })
              })
            }
          />
          <CreateOrganizationModal />
        </Group>
        <OrganizationsTable />
      </Stack>
    </Stack>
  );
}
