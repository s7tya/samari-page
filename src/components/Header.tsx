import { Button, Flex, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Flex
      as="header"
      py="12px"
      px="20px"
      alignItems="center"
      maxW="container.md"
      mx="auto"
    >
      <Text fontWeight="bold">
        Samari
        <Text as="span" fontSize="sm" color="gray.500">
          (サマリ)
        </Text>
      </Text>
      <Spacer />
      <HStack>
        <Button size="sm">ログイン</Button>
        <Button size="sm" colorScheme="yellow">
          新規登録
        </Button>
      </HStack>
    </Flex>
  );
};
