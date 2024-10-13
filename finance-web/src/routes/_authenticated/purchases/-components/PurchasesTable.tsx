import { ActionIcon, Badge, Menu, Text } from '@mantine/core';
import { IconDotsVertical, IconTruckDelivery } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { Link, getRouteApi } from '@tanstack/react-router';
import { useDataTableColumns } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import { api } from 'src/api/axios';
import { type Page, createURL } from 'src/api/types/Defaults';
import type { GetPurchasesResponse } from 'src/api/types/PurchaseTypes';
import PreconfiguredDataTable from 'src/components/Shared/PreconfiguredDataTable';
import { Tooltippable } from 'src/components/Shared/Tooptippable';
import { StatusColorMap } from 'src/utils/color-helper';
import { FormatDateTime, FormatPrice } from 'src/utils/formatter';

const route = getRouteApi('/_authenticated/purchases/');

export default function PurchasesTable() {
  const { t } = useTranslation();
  const { page, sort, size, supplierId } = route.useSearch();
  const navigate = route.useNavigate();
  const pageable = {
    page: page,
    size: size,
    sort: sort
  };

  const query = useQuery({
    queryKey: ['purchases', pageable, supplierId],
    queryFn: async () => (await api.get<Page<GetPurchasesResponse>>(createURL('/purchases', pageable, { supplierId }))).data,
    staleTime: 120000
  });

  const { effectiveColumns } = useDataTableColumns<GetPurchasesResponse>({
    key: 'purchases',
    columns: [
      { accessor: 'id', title: 'ID', sortable: true },
      { accessor: 'worksite.name', title: 'Çalışma Yeri', sortable: true, render: (record) => record.worksite.name, ellipsis: true },
      { accessor: 'supplier.name', title: 'Tedarikçi', sortable: true, render: (record) => record.supplier.name },
      {
        accessor: 'description',
        title: 'Açıklama',
        render: (record) => (
          <Text w="25ch" truncate="end">
            {record.description}
          </Text>
        )
      },
      { accessor: 'purchaseDate', title: 'Tarih', render: (record) => FormatDateTime(record.purchaseDate) },
      { accessor: 'total', title: 'Tutar', render: (record) => FormatPrice(record.total, record.currency.code) },
      {
        accessor: 'lastAction.status',
        title: 'Durum',
        render: (record) => (
          <Tooltippable label={record.lastAction.comment}>
            <Badge color={StatusColorMap[record.lastAction.status]}>{t(record.lastAction.status)}</Badge>
          </Tooltippable>
        )
      },
      { accessor: 'lastAction.createdAt', title: 'Guncellenme Tarihi', render: (record) => FormatDateTime(record.lastAction.createdAt) },
      {
        accessor: 'actions',
        title: '',
        textAlign: 'right',
        render: (record) => (
          <Menu shadow="md" withArrow>
            <Menu.Target>
              <ActionIcon size="sm" variant="transparent" color="white">
                <IconDotsVertical size={16} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {record.lastAction.status === 'IN_PROGRESS' && (
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/deliveries/new" search={{ purchaseId: record.id }}>
                  <Menu.Item leftSection={<IconTruckDelivery size={16} />}>Yeni Teslimat</Menu.Item>
                </Link>
              )}
            </Menu.Dropdown>
          </Menu>
        )
      }
    ]
  });

  return (
    <PreconfiguredDataTable
      columns={effectiveColumns}
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
      totalRecords={query.data?.page.totalElements}
      recordsPerPage={size}
      page={page}
      onPageChange={(p) =>
        navigate({
          search: (prev) => ({ ...prev, page: p })
        })
      }
    />
  );
}
