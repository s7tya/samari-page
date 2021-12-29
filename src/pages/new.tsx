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

const arrayChunk = ([...array], size = 1) => {
  return array.reduce(
    (acc, _value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );
};

const NewPost: NextPage = () => {
  const [images, setImages] = useState<FileWithPreview[]>([]);

  const [postTitle, setPostTitle] = useState("");
  const [includeTitle, setIncludeTitle] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [tweets, setTweets] = useState<FileWithPreview[][]>([]);

  useEffect(() => {
    if (images) {
      setTweets(arrayChunk(images, 4));
    } else {
    }
  }, [images]);

  return (
    <Container maxW="container.lg" px="20px">
      <Grid templateColumns={{ base: "1fr", md: "6fr 4fr" }} gap="40px">
        <Box>
          <Box rounded="md" bg="white" p="20px">
            {tweets.length === 0 && (
              <Stack textAlign="center" spacing="4px" py="20px">
                <Text>画像がありません</Text>
                <Text fontSize="14px" color="gray.500">
                  アップロードしてプレビューを表示しましょう
                </Text>
              </Stack>
            )}
            {tweets.map((tweetImages, index) => (
              <TweetCard
                key={index}
                body={`${includeTitle || index == 0 ? postTitle : ""} ${
                  includeNumber ? `(${index + 1}/${tweets.length + 1})` : ""
                }`}
                hasChild={true}
                images={tweetImages}
                setImages={setImages}
              />
            ))}
          </Box>
        </Box>
        <Stack spacing="20px" alignItems="flex-end">
          <Stack rounded="md" bg="white" p="20px" spacing="20px" w="full">
            <Stack spacing="4px">
              <Text fontSize="14px" fontWeight="bold">
                タイトル
              </Text>
              <Input
                size="sm"
                rounded="md"
                value={postTitle}
                onChange={e => {
                  setPostTitle(e.target.value);
                }}
              />
            </Stack>
            <Stack>
              <Checkbox
                isChecked={includeNumber}
                onChange={e => {
                  setIncludeNumber(e.target.checked);
                }}
              >
                ツイートに番号を含める
              </Checkbox>
              <Checkbox
                isChecked={includeTitle}
                onChange={e => {
                  setIncludeTitle(e.target.checked);
                }}
              >
                すべてのツイートにタイトルを含める
              </Checkbox>
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
