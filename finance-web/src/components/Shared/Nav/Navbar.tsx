import { Tooltip, UnstyledButton } from '@mantine/core';
import { IconBuildingCommunity, IconBuildingWarehouse, IconHome, IconId, IconLogout } from '@tabler/icons-react';
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
      <Tooltip label="Anasayfa" position="right" transitionProps={{ duration: 200 }}>
        <Link className={classes.link} to="/dashboard">
          <IconHome style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        </Link>
      </Tooltip>
      <Tooltip label="Şirketler" position="right" transitionProps={{ duration: 200 }}>
        <Link className={classes.link} to="/companies">
          <IconBuildingCommunity style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        </Link>
      </Tooltip>
      <Tooltip label="Ürünler" position="right" transitionProps={{ duration: 200 }}>
        <Link className={classes.link} to="/products" search={{ page: 0, size: 20, sort: { id: 'id', direction: 'desc' } }}>
          <IconBuildingWarehouse style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        </Link>
      </Tooltip>
      <Tooltip label="Personeller" position="right" transitionProps={{ duration: 200 }}>
        <Link
          className={classes.link}
          to="/employees"
          search={{
            page: 0,
            size: 20,
            sort: { id: 'currentWorksite.id', direction: 'desc' }
          }}>
          <IconId style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        </Link>
      </Tooltip>
      <Tooltip label="Çıkış" position="right" transitionProps={{ duration: 200 }}>
        <UnstyledButton className={classes.logout} onClick={handleLogout}>
          <IconLogout style={{ width: '1.25rem', height: '1.25rem' }} stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    </nav>
  );
}
