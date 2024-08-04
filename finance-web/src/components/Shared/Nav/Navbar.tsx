import { Text, UnstyledButton } from '@mantine/core';
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
    <nav className={classes.navbar}>
      <Link className={classes.link} to="/dashboard">
        <IconHome style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Anasayfa</Text>
      </Link>
      <Link className={classes.link} to="/companies">
        <IconBuildingCommunity style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Şirketler</Text>
      </Link>
      <Link className={classes.link} to="/products" search={{ page: 0, size: 20, sort: { id: 'id', direction: 'desc' } }}>
        <IconBuildingWarehouse style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Ürünler</Text>
      </Link>
      <Link
        className={classes.link}
        to="/employees"
        search={{
          page: 0,
          size: 20,
          sort: { id: 'currentWorksite.id', direction: 'desc' }
        }}>
        <IconId style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Personeller</Text>
      </Link>
      <Link
        className={classes.link}
        to="/worksites"
        search={{
          page: 0,
          size: 20,
          sort: { id: 'id', direction: 'desc' }
        }}>
        <IconBuildingFactory2 style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Çalışma Yerleri</Text>
      </Link>
      <Link
        className={classes.link}
        to="/purchases"
        search={{
          page: 0,
          size: 20,
          sort: { id: 'id', direction: 'desc' }
        }}>
        <IconBasket style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Satın Alımlar</Text>
      </Link>
      <UnstyledButton mt="auto" className={classes.link} onClick={handleLogout}>
        <IconLogout style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        <Text size="sm">Çıkış</Text>
      </UnstyledButton>
    </nav>
  );
}
