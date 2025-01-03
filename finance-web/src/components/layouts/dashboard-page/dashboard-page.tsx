import { Group, Title } from '@mantine/core';
import type { ReactNode } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import { Fragment } from 'react/jsx-runtime';

interface DashboardPageProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}

export function DashboardPage({ icon: Icon, title, children }: DashboardPageProps) {
  return (
    <Fragment>
      <Helmet>
        <title>{title} | Canverse</title>
      </Helmet>
      <Group align="center" mb="xl">
        {Icon && <Icon size={36} />}
        <Title size={28}>{title}</Title>
      </Group>
      {children}
    </Fragment>
  );
}
