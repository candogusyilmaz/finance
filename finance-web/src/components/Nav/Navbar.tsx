import { Tooltip } from '@mantine/core';
import { IconHome, IconLock } from '@tabler/icons-react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import classes from './Navbar.module.css';

export function Navbar() {
  const [active, setActive] = useState(false);

  return (
    <nav className={classes.navbar}>
      <Tooltip
        label="Anasayfa"
        position="right"
        transitionProps={{ duration: 0 }}
      >
        <Link
          className={classes.link}
          data-active={active || undefined}
          to="/dashboard"
        >
          <IconHome
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </Link>
      </Tooltip>
      <Tooltip
        label="Giris"
        position="right"
        transitionProps={{ duration: 100 }}
      >
        <Link
          className={classes.link}
          data-active={active || undefined}
          to="/login"
        >
          <IconLock
            style={{ width: '1.25rem', height: '1.25rem' }}
            stroke={1.5}
          />
        </Link>
      </Tooltip>
    </nav>
  );
}
