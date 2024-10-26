import { Tooltip, type TooltipProps } from '@mantine/core';

interface TooltippableProps extends Omit<TooltipProps, 'label'> {
  label?: string;
}

export function Tooltippable({ label, children, ...props }: Readonly<TooltippableProps>) {
  if (!label) return children;

  return (
    <Tooltip label={label} {...props}>
      {children}
    </Tooltip>
  );
}
