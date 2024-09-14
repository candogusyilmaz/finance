import { Title, type TitleProps, rem } from '@mantine/core';

interface Title1Props extends TitleProps {
  title: string;
}

export function RouteTitle({ title, ...props }: Readonly<Title1Props>) {
  return (
    <Title size={rem(28)} {...props}>
      {title}
    </Title>
  );
}
