import { Stack, Text } from '@mantine/core';
import {
  IconBasket,
  IconBuildingCommunity,
  IconBuildingFactory2,
  IconBuildingWarehouse,
  IconHome,
  IconId,
  IconSettings
} from '@tabler/icons-react';
import { Link, linkOptions } from '@tanstack/react-router';
import { PartyRoles } from 'src/api/types/PartyTypes';
import classes from './sidebar.module.css';

const links = [
  linkOptions({
    to: '/',
    label: 'Anasayfa',
    icon: IconHome
  }),
  linkOptions({
    to: '/organizations',
    label: 'Organizasyonlar',
    icon: IconBuildingCommunity,
    search: { page: 1, size: 20, sort: { id: 'name', direction: 'asc' }, role: PartyRoles.AFFILIATE }
  }),
  linkOptions({
    to: '/products',
    label: 'Ürünler',
    icon: IconBuildingWarehouse,
    search: { size: 20, sort: { id: 'id', direction: 'desc' } }
  }),
  linkOptions({
    to: '/employees',
    label: 'Personeller',
    icon: IconId,
    search: { page: 1, size: 20, sort: { id: 'em.organization.name', direction: 'asc' } }
  }),
  linkOptions({
    to: '/worksites',
    label: 'Çalışma Yerleri',
    icon: IconBuildingFactory2,
    search: { page: 1, size: 20, sort: { id: 'id', direction: 'desc' } }
  }),
  linkOptions({
    to: '/purchases',
    label: 'Satın Alımlar',
    icon: IconBasket,
    search: { page: 1, size: 20, sort: { id: 'id', direction: 'desc' } }
  }),
  linkOptions({
    to: '/settings',
    label: 'Ayarlar',
    icon: IconSettings
  })
];

export function Sidebar({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <Stack h="100%" gap={0}>
      {links.map(({ label, icon: Icon, ...rest }) => (
        <Link {...rest} key={rest.to} className={classes.link} onClick={onLinkClick}>
          <Icon />
          <Text size="sm">{label}</Text>
        </Link>
      ))}
    </Stack>
  );
}
