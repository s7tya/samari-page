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
import { useUser } from "../lib/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const arrayChunk = ([...array], size = 1) => {
  return array.reduce(
    (acc, _value, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );
};

const toBase64 = async (blob: File) => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;

      if (typeof dataUrl !== "string") {
        return new Error("Invalid image");
      }

      resolve(dataUrl?.replace(/data:.*\/.*;base64,/, ""));
    };
    reader.readAsDataURL(blob);
  });
};

const NewPost: NextPage = () => {
  const user = useUser();
  const [images, setImages] = useState<FileWithPreview[]>([]);

  const [postTitle, setPostTitle] = useState("");
  const [includeTitle, setIncludeTitle] = useState(true);
  const [tweets, setTweets] = useState<FileWithPreview[][]>([]);

  const tweet = async () => {
    if (!user) {
      return;
    }

    const db = getFirestore();
    const docRef = doc(db, "tokens", user?.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return;
    }

    const base64Images = await Promise.all(
      images.map(async image => {
        return await toBase64(image);
      })
    );

    if (!base64Images[0]) {
      return;
    }

    const body = JSON.stringify({
      accessToken: docSnap.data().accessToken,
      accessTokenSecret: docSnap.data().accessTokenSecret,
      images: base64Images,
      title: postTitle,
      includeTitle: includeTitle,
    });

    await fetch(`/api/tweet`, {
      method: "POST",
      body,
    });
  };

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
                  tweets.length > 1 ? `(${index + 1}/${tweets.length})` : ""
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
                isChecked={includeTitle}
                onChange={e => {
                  setIncludeTitle(e.target.checked);
                }}
              >
                すべてのツイートにタイトルを含める
              </Checkbox>
            </Stack>
            <ButtonGroup>
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => {
                  setImages([]);
                }}
              >
                画像をリセット
              </Button>
            </ButtonGroup>
          </Stack>
          <MangaDropzone setImages={setImages} />
          <ButtonGroup>
            <Button
              bg="twitter"
              color="white"
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={async () => {
                await tweet();
                await setImages([]);
              }}
              isDisabled={tweets.length == 0 || !user}
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
