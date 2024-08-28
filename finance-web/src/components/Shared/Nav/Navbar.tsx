import { Stack, Text, UnstyledButton, rem } from '@mantine/core';
import {
  IconBasket,
  IconBuildingCommunity,
  IconBuildingFactory2,
  IconBuildingWarehouse,
  IconHome,
  IconId,
  IconLogout
} from '@tabler/icons-react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { PartyRoles } from 'src/api/types/PartyTypes';
import { useAuth } from '../../../utils/auth';
import classes from './Navbar.module.css';

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await router.invalidate();
    await navigate({ to: '/login' });
  };

  return (
    <Stack h="100%" gap={rem(3)}>
      <Link className={classes.link} to="/dashboard">
        <IconHome size={18} />
        <Text size="sm">Anasayfa</Text>
      </Link>
      <Link
        className={classes.link}
        to="/organizations"
        search={{ page: 1, size: 20, sort: { id: 'name', direction: 'asc' }, role: PartyRoles.AFFILIATE }}>
        <IconBuildingCommunity size={18} />
        <Text size="sm">Organizasyonlar</Text>
      </Link>
      <Link className={classes.link} to="/products" search={{ size: 20, sort: { id: 'id', direction: 'desc' } }}>
        <IconBuildingWarehouse size={18} />
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
        <IconId size={18} />
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
        <IconBuildingFactory2 size={18} />
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
        <IconBasket size={18} />
        <Text size="sm">Satın Alımlar</Text>
      </Link>
      <UnstyledButton mt="auto" className={classes.link} onClick={handleLogout}>
        <IconLogout size={18} />
        <Text size="sm">Çıkış</Text>
      </UnstyledButton>
    </Stack>
  );
}
