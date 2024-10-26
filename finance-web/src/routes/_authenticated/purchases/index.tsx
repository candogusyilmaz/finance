import { Button, Group, Stack } from '@mantine/core';
import { IconBasket, IconPlus } from '@tabler/icons-react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import { PartyRoles } from 'src/api/types/PartyTypes';
import { PartySelect } from 'src/components/dropdowns/party-select';
import { RouteTitle } from 'src/components/ui/route-title';
import { z } from 'zod';
import { PurchasesTable } from './-components/PurchasesTable';

export const Route = createFileRoute('/_authenticated/purchases/')({
  component: Purchases,
  validateSearch: PageSchema.extend({
    supplierId: z.string().nullable().optional()
  })
});

function Purchases() {
  const navigate = Route.useNavigate();

  return (
    <Stack mih="100%" miw="100%" gap="lg">
      <Group align="center" mb="lg">
        <IconBasket size={36} />
        <RouteTitle title="Satın Alımlar" />
      </Group>
      <Stack>
        <Group>
          <PartySelect
            partyRoles={[PartyRoles.SUPPLIER]}
            clearable
            placeholder="Tedarikçiye göre filtrele"
            onChange={(val) =>
              navigate({
                search: (prev) => ({ ...prev, supplierId: val as string | undefined })
              })
            }
          />
          <Link to="/purchases/new" style={{ marginLeft: 'auto' }}>
            <Button leftSection={<IconPlus stroke={1.5} />}>Yeni satın alım oluştur</Button>
          </Link>
        </Group>
        <PurchasesTable />
      </Stack>
    </Stack>
  );
}
