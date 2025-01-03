import { Flex, Loader } from '@mantine/core';

export function FullscreenLoader() {
  return (
    <Flex w="100dvw" h="100dvh" justify="center" align="center" pos="absolute" style={{ zIndex: 95883 }}>
      <Loader type="dots" />
    </Flex>
  );
}
