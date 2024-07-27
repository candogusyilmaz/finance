import { Text, type TextProps, rem } from '@mantine/core';

interface Title1Props extends TextProps {
  children: React.ReactNode;
}

export function RouteTitle({ children, ...props }: Readonly<Title1Props>) {
  return (
    <Text pl={rem(8)} size={rem(32)} w={rem(200)} {...props}>
      {children}
    </Text>
  );
}
