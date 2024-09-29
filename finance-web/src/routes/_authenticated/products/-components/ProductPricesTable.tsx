import { Button, Group, Popover, Stack, rem } from '@mantine/core';
import { DatePickerInput, type DateValue } from '@mantine/dates';
import { IconCalendarDown, IconCalendarUp, IconSearch } from '@tabler/icons-react';
import { getRouteApi } from '@tanstack/react-router';
import type { DataTableColumn } from 'mantine-datatable';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import { PartyRoles } from 'src/api/types/PartyTypes';
import type { GetProductPricesResponse } from 'src/api/types/ProductPriceTypes';
import PartySelect from 'src/components/Dropdowns/PartySelect';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { FormatDate, FormatDateTime, FormatISODate, FormatPercentage, FormatPrice } from 'src/utils/formatter';
import CreateProductPriceModal from './CreateProductPriceModal';

const route = getRouteApi('/_authenticated/products/$productId');

export default function ProductPricesTable() {
  const [opened, setOpened] = useState(false);
  const [subcontractorId, setSubcontractorId] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<DateValue | undefined>();
  const [endDate, setEndDate] = useState<DateValue | undefined>();

  const { page, sort, size } = route.useSearch();
  const { productId } = route.useParams();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const [querySearchParams, setQuerySearchParams] = useState({});

  const query = useQuery({
    queryKey: [`product-${productId}-prices`, pageable, querySearchParams],
    queryFn: async () => {
      return (await api.get<Page<GetProductPricesResponse>>(createURL(`/products/${productId}/prices`, pageable, querySearchParams))).data;
    },
    cacheTime: 1200000,
    staleTime: 1200000
  });

  const columns: DataTableColumn<GetProductPricesResponse>[] = [
    { accessor: 'supplier.name', title: 'Tedarikçi', sortable: true },
    {
      accessor: 'price',
      title: 'Fiyat',
      sortable: true,
      render: (record) => FormatPrice(record.price, record.currency.code)
    },
    {
      accessor: 'vatRate',
      title: 'KDV Oranı',
      render: (record) => FormatPercentage(record.vatRate)
    },
    {
      accessor: 'withholdingTaxRate',
      title: 'Stopaj Oranı',
      render: (record) => FormatPercentage(record.withholdingTaxRate)
    },
    {
      accessor: 'startDate',
      title: 'Başlangıç Tarihi',
      render: (record) => FormatDate(record.startDate)
    },
    {
      accessor: 'endDate',
      title: 'Bitiş Tarihi',
      render: (record) => FormatDate(record.endDate)
    },
    { accessor: 'priceConfirmedBy.displayName', title: 'Onaylayan' },
    {
      accessor: 'createdAt',
      title: 'Oluşturulma Tarihi',
      render: (record) => FormatDateTime(record.createdAt)
    },
    {
      accessor: 'updatedAt',
      title: 'Son Güncelleme Tarihi',
      render: (record) => FormatDateTime(record.updatedAt)
    }
  ];

  return (
    <Stack>
      <Group justify="space-between">
        <Popover opened={opened} onChange={setOpened} trapFocus width={200} position="bottom-start" shadow="md">
          <Popover.Target>
            <Button onClick={() => setOpened((o) => !o)} variant="default" px="xl">
              Filtrele
            </Button>
          </Popover.Target>
          <Popover.Dropdown miw={rem(300)}>
            <Stack gap="md">
              <PartySelect
                clearable
                onClear={() => setSubcontractorId(undefined)}
                label="Tedarikçi"
                value={subcontractorId}
                onChange={(value) => {
                  if (value) setSubcontractorId(value);
                }}
                comboboxProps={{
                  withinPortal: false
                }}
                partyRoles={[PartyRoles.SUPPLIER]}
              />
              <DatePickerInput
                label="Başlangıç Tarihi"
                clearable
                popoverProps={{ withinPortal: false }}
                value={startDate}
                onChange={setStartDate}
                leftSection={<IconCalendarDown size={18} />}
              />
              <DatePickerInput
                popoverProps={{ withinPortal: false }}
                label="Bitiş Tarihi"
                clearable
                value={endDate}
                onChange={setEndDate}
                leftSection={<IconCalendarUp size={18} />}
              />
              <Group justify="end" mt={rem(18)}>
                <Button
                  variant="default"
                  onClick={(e) => {
                    e.preventDefault();
                    setQuerySearchParams({});
                    setOpened(false);
                    setSubcontractorId(undefined);
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}>
                  Sıfırla
                </Button>
                <Button
                  data-autofocus
                  miw={rem(100)}
                  leftSection={<IconSearch size={18} />}
                  onClick={(e) => {
                    e.preventDefault();
                    setQuerySearchParams({
                      subcontractorId: subcontractorId && Number.parseInt(subcontractorId),
                      startDate: startDate && FormatISODate(startDate),
                      endDate: endDate && FormatISODate(endDate)
                    });
                    setOpened(false);
                  }}>
                  Ara
                </Button>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
        <CreateProductPriceModal productId={Number.parseInt(productId)} />
      </Group>
      <PreconfiguredDataTable
        minHeight={rem(300)}
        columns={columns}
        records={query.data?.content}
        fetching={query.isFetching}
        sortStatus={{ columnAccessor: sort.id, direction: sort.direction }}
        onSortStatusChange={(s) =>
          navigate({
            search: (prev) => ({
              ...prev,
              sort: { id: s.columnAccessor, direction: s.direction }
            })
          })
        }
        totalRecords={query.data?.totalElements}
        recordsPerPage={size}
        page={page}
        onPageChange={(p) =>
          navigate({
            search: (prev) => ({ ...prev, page: p })
          })
        }
      />
    </Stack>
  );
}
