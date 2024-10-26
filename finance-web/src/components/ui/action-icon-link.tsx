import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { Link, createLink } from '@tanstack/react-router';
import React from 'react';

export const ActionIconLink = createLink(
  React.forwardRef((props: ActionIconProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
    return <ActionIcon {...props} ref={ref} component={Link} />;
  })
);
