import { Button, Group, Stack } from '@mantine/core';
import { IconBasket, IconPlus } from '@tabler/icons-react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { PageSchema } from 'src/api/types/Defaults';
import CompanySelect from 'src/components/Dropdowns/CompanySelect';
import { RouteTitle } from 'src/components/Shared/RouteTitle';
import { z } from 'zod';
import PurchasesTable from './-components/PurchasesTable';

export const Route = createFileRoute('/_authenticated/purchases/')({
  component: Purchases,
  validateSearch: PageSchema.extend({
    companyId: z.string().nullable().optional()
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
          <CompanySelect
            clearable
            placeholder="Şirkete göre filtrele"
            onChange={(val) =>
              navigate({
                search: (prev) => ({ ...prev, companyId: val as string | undefined })
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
