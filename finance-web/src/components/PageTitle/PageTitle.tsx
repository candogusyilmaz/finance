import { Group, type GroupProps, Title } from '@mantine/core';
import type React from 'react';
import classes from './PageTitle.module.css';

interface Props extends GroupProps {
  icon?: React.ReactNode;
  label: React.ReactNode | string;
}

function PageTitle({ icon, label, ...rest }: Props) {
  return (
    <Group className={classes.group} {...rest}>
      {icon}
      {typeof label === 'string' ? <Title order={2}>{label}</Title> : label}
    </Group>
  );
}

export default PageTitle;
