import { Center, Image } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/')({
  component: () => (
    <Center>
      <Image src="/dashboard.png" w="40%" />
    </Center>
  )
});
