import {
  Button,
  ButtonGroup,
  Heading,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Stack spacing="40px" pt="100px" px="20px" alignItems="center">
        <Stack spacing="28px" alignItems="center">
          <Stack spacing="8px" alignItems="center">
            <Heading fontSize="28px">簡単操作で漫画を一括投稿</Heading>
            <Text textAlign="center">
              一枚一枚画像を選んで 順番を間違えてやり直し...
              <br />
              Samari(サマリ)なら一括で選択して後から並べ替えるのも簡単です
            </Text>
          </Stack>
          <ButtonGroup>
            <Button
              as="a"
              bg="brand.500"
              color="black"
              href="https://zenn.dev/s7/scraps/1f58a6cf883b6e"
            >
              詳細を見る
            </Button>
          </ButtonGroup>
        </Stack>
        <Img src="/thumbnail.png" rounded="lg" />
      </Stack>
    </>
  );
};

export default Home;
