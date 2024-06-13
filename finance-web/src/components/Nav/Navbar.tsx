import { Tooltip, UnstyledButton } from '@mantine/core';
import {
  IconBuildingCommunity,
  IconBuildingWarehouse,
  IconHome,
  IconLock,
  IconLogout
} from '@tabler/icons-react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { useAuth } from '../../utils/auth';
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
      <Tooltip
        label="Anasayfa"
        position="right"
        transitionProps={{ duration: 200 }}
      >
        <Link className={classes.link} to="/dashboard">
          <IconHome
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </Link>
      </Tooltip>
      <Tooltip
        label="Şirketler"
        position="right"
        transitionProps={{ duration: 200 }}
      >
        <Link className={classes.link} to="/companies">
          <IconBuildingCommunity
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </Link>
      </Tooltip>
      <Tooltip
        label="Ürünler"
        position="right"
        transitionProps={{ duration: 200 }}
      >
        <Link className={classes.link} to="/products">
          <IconBuildingWarehouse
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </Link>
      </Tooltip>
      <Tooltip
        label="Giris"
        position="right"
        transitionProps={{ duration: 200 }}
      >
        <Link className={classes.link} to="/login">
          <IconLock
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </Link>
      </Tooltip>
      <Tooltip
        label="Cikis"
        position="right"
        transitionProps={{ duration: 200 }}
      >
        <UnstyledButton className={classes.logout} onClick={handleLogout}>
          <IconLogout
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </UnstyledButton>
      </Tooltip>
    </nav>
  );
}
