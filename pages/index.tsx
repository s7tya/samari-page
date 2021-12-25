import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Container maxW="container.lg">
      <VStack spacing="40px" py="100px">
        <VStack spacing="28px">
          <VStack spacing="8px">
            <Heading fontSize="28px">簡単操作で漫画を一括投稿</Heading>
            <Text textAlign="center">
              一枚一枚画像を選んで 順番を間違えてやり直し...
              <br />
              Samari(サマリ)なら一括で選択して後から並べ替えるのも簡単です
            </Text>
          </VStack>
          <ButtonGroup>
            <Button as="a" bg="brand.500" color="black">
              詳細を見る
            </Button>
          </ButtonGroup>
        </VStack>
        <Img src="/thumbnail.png" rounded="lg" />
      </VStack>
    </Container>
  );
};

export default Home;
