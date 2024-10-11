import { Button, Container, Flex, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { Link } from '@tanstack/react-router';
import classes from './NotFound.module.css';

export default function NotFound() {
  return (
    <Flex style={{ height: '100dvh' }} justify="center" align="center">
      <Container>
        <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
          <div>
            <Title className={classes.title}>Bir şeyler yanlış...</Title>
            <Text c="dimmed" size="lg">
              Açmaya çalıştığınız sayfa mevcut değil. Adresi yanlış yazmış olabilirsiniz veya sayfa başka bir URL'ye taşınmış olabilir.
              Bunun bir hata olduğunu düşünüyorsanız, destek ile iletişime geçin.
            </Text>
            <Link to="/">
              <Button variant="outline" size="md" mt="xl" className={classes.control}>
                Ana sayfaya geri dön
              </Button>
            </Link>
          </div>
          <Image src="404.svg" className={classes.desktopImage} />
        </SimpleGrid>
      </Container>
    </Flex>
  );
}
