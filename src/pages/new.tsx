import {
  Container,
  Box,
  Grid,
  Stack,
  Text,
  Input,
  Checkbox,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";

const NewPost: NextPage = () => {
  return (
    <Container maxW="container.lg" px="20px">
      <Grid templateColumns={{ base: "1fr", md: "6fr 4fr" }} gap="40px">
        <Box rounded="md" bg="white" p="20px">
          ツイートプレビュー
        </Box>
        <Stack spacing="20px" alignItems="flex-end">
          <Stack rounded="md" bg="white" p="20px" spacing="20px" w="full">
            <Stack>
              <Text fontSize="14px" fontWeight="bold">
                タイトル
              </Text>
              <Input size="sm" rounded="md" />
            </Stack>
            <Stack>
              <Checkbox>ツイートに番号を含める</Checkbox>
              <Checkbox>ツイートにタイトルを含める</Checkbox>
            </Stack>
          </Stack>
          <Stack
            rounded="md"
            bg="white"
            p="20px"
            border="2px dashed"
            borderColor="gray.400"
            textAlign="center"
            w="full"
          >
            <Text>ファイルをドラッグ&ドロップ でアップロード</Text>
            <Text fontSize="14px" color="gray.500">
              ファイル形式: .jpg .png
            </Text>
          </Stack>
          <ButtonGroup>
            <Button
              bg="twitter"
              color="white"
              _hover={{ bg: "blue.500", color: "white" }}
            >
              ツイートする
            </Button>
          </ButtonGroup>
        </Stack>
      </Grid>
    </Container>
  );
};

export default NewPost;
