import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Img,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useUser } from "../lib/auth";
import { FileWithPreview } from "./MangaDropzone";

interface TweetCardProps {
  body?: string;
  images?: FileWithPreview[];
  hasChild?: boolean;
  setImages: (images: FileWithPreview[]) => void;
}

export const TweetCard: React.FC<TweetCardProps> = ({
  body,
  images = [],
  hasChild,
  setImages,
}) => {
  const user = useUser();

  return (
    <Stack spacing="0">
      <HStack spacing="12px">
        <Avatar size="sm" src={user?.photoURL ?? undefined} />
        <Text fontSize="md" fontWeight="bold">
          {user?.displayName ?? "Samari"}
        </Text>
      </HStack>
      <Grid templateColumns="32px 1fr" gap="12px">
        <Box
          bg={hasChild ? "gray.300" : "none"}
          w="3px"
          h="full"
          justifySelf="center"
        ></Box>
        <Stack pb="16px">
          <Text>{body}</Text>
          <Grid
            templateColumns="1fr 1fr"
            templateRows="1fr 1fr"
            gap="2px"
            rounded="md"
            overflow="hidden"
          >
            {images.map((image, index) => (
              <GridItem maxH="200px" key={index}>
                <Img h="full" w="full" objectFit="cover" src={image.preview} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
};
