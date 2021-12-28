import React, { useCallback } from "react";
import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

export const MangaDropzone: React.FC = () => {
  const onDrop = useCallback(acceptedFiles => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <Box
      position="relative"
      rounded="md"
      bg="white"
      px="20px"
      py="28px"
      border="2px dashed"
      borderColor="gray.400"
      textAlign="center"
      overflow="hidden"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Stack alignItems="center">
        <Text>ファイルをドラッグ&ドロップしてアップロード</Text>
        <Text fontSize="14px" color="gray.500">
          または
        </Text>
        <Text
          display="inline-block"
          rounded="md"
          px="4"
          py="1"
          cursor="pointer"
          bg="yellow.400"
          _hover={{
            bg: "yellow.500",
          }}
        >
          ファイルを選択
        </Text>
      </Stack>
      {isDragActive && (
        <Center
          position="absolute"
          left="0"
          top="0"
          w="full"
          h="full"
          bg="blackAlpha.700"
        >
          <Text color="white">ドロップしてアップロード</Text>
        </Center>
      )}
    </Box>
  );
};
