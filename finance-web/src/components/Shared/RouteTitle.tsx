import { Text, type TextProps, rem } from '@mantine/core';

interface Title1Props extends TextProps {
  title: string;
}

export function RouteTitle({ title, ...props }: Readonly<Title1Props>) {
  return (
    <Text fw="800" size={rem(32)} {...props}>
      {title}
    </Text>
  );
}
