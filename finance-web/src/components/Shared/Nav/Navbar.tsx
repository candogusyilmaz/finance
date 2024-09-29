import { Stack, Text } from '@mantine/core';
import { IconBasket, IconBuildingCommunity, IconBuildingFactory2, IconBuildingWarehouse, IconHome, IconId } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { PartyRoles } from 'src/api/types/PartyTypes';
import classes from './Navbar.module.css';

export function Navbar() {
  return (
    <Stack h="100%" gap={0}>
      <Link className={classes.link} to="/dashboard">
        <IconHome size={20} />
        <Text size="sm">Anasayfa</Text>
      </Link>
      <Link
        className={classes.link}
        to="/organizations"
        search={{ page: 1, size: 20, sort: { id: 'name', direction: 'asc' }, role: PartyRoles.AFFILIATE }}>
        <IconBuildingCommunity size={20} />
        <Text size="sm">Organizasyonlar</Text>
      </Link>
      <Link className={classes.link} to="/products" search={{ size: 20, sort: { id: 'id', direction: 'desc' } }}>
        <IconBuildingWarehouse size={20} />
        <Text size="sm">Ürünler</Text>
      </Link>
      <Link
        className={classes.link}
        to="/employees"
        search={{
          page: 1,
          size: 20,
          sort: { id: 'em.organization.name', direction: 'asc' }
        }}>
        <IconId size={20} />
        <Text size="sm">Personeller</Text>
      </Link>
      <Link
        className={classes.link}
        to="/worksites"
        search={{
          page: 1,
          size: 20,
          sort: { id: 'id', direction: 'desc' }
        }}>
        <IconBuildingFactory2 size={20} />
        <Text size="sm">Çalışma Yerleri</Text>
      </Link>
      <Link
        className={classes.link}
        to="/purchases"
        search={{
          page: 1,
          size: 20,
          sort: { id: 'id', direction: 'desc' }
        }}>
        <IconBasket size={20} />
        <Text size="sm">Satın Alımlar</Text>
      </Link>
    </Stack>
  );
}
