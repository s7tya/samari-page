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
import { useEffect, useState } from "react";
import { FileWithPreview, MangaDropzone } from "../components/MangaDropzone";
import { TweetCard } from "../components/TweetCard";

const NewPost: NextPage = () => {
  const [images, setImages] = useState<FileWithPreview[]>();

  return (
    <Container maxW="container.lg" px="20px">
      <Grid templateColumns={{ base: "1fr", md: "6fr 4fr" }} gap="40px">
        <Box>
          <Box rounded="md" bg="white" p="20px">
            <TweetCard
              body="漫画を一括アップロードできるやつを作る (1/4)"
              hasChild={true}
              images={images}
              setImages={setImages}
            />
          </Box>
        </Box>
        <Stack spacing="20px" alignItems="flex-end">
          <Stack rounded="md" bg="white" p="20px" spacing="20px" w="full">
            <Stack spacing="4px">
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
          <MangaDropzone setImages={setImages} />
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
