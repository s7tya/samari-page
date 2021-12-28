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

interface TweetCardProps {
  body?: string;
  hasChild?: boolean;
}

export const TweetCard: React.FC<TweetCardProps> = ({ body, hasChild }) => {
  const user = useUser();

  const images = [
    "https://dummyimage.com/200x630",
    "https://dummyimage.com/800x630",
    "https://dummyimage.com/1200x630",
    "https://dummyimage.com/1200x630",
  ];

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
            {images.map(imageURL => (
              <GridItem maxH="200px">
                <Img h="full" w="full" objectFit="cover" src={imageURL} />
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Grid>
    </Stack>
  );
};
