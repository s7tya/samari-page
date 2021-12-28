import {
  Avatar,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { login, logout, useUser } from "../lib/auth";

export const Header: React.FC = () => {
  const user = useUser();

  return (
    <Flex
      as="header"
      py="12px"
      px="20px"
      alignItems="center"
      maxW="container.lg"
      mx="auto"
    >
      <NextLink href="/" passHref>
        <Text as="a" fontWeight="bold">
          Samari
          <Text as="span" fontSize="sm" color="gray.500">
            (サマリ)
          </Text>
        </Text>
      </NextLink>
      <Spacer />
      <HStack>
        {user ? (
          <HStack gap="8px">
            <NextLink href="/new" passHref>
              <Button as="a" colorScheme="yellow" size="sm">
                新規投稿
              </Button>
            </NextLink>
            <Menu>
              <MenuButton>
                <Avatar size="sm" src={user.photoURL ?? undefined} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <Text color="red.500">ログアウト</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        ) : (
          <Button
            size="sm"
            colorScheme="yellow"
            onClick={() => {
              login();
            }}
          >
            ログイン
          </Button>
        )}
      </HStack>
    </Flex>
  );
};
