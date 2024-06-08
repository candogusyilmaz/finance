import { Tooltip } from '@mantine/core';
import { IconHome, IconLock } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import classes from './Navbar.module.css';

export function Navbar() {
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
    </nav>
  );
}
