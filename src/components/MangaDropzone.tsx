import React, { useCallback } from "react";
import { Stack, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

export const MangaDropzone: React.FC = () => {
  const onDrop = useCallback(acceptedFiles => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop,
  });

  return (
    <Stack
      rounded="md"
      bg="white"
      px="20px"
      py="28px"
      border="2px dashed"
      borderColor="gray.400"
      textAlign="center"
      alignItems="center"
      w="full"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Text>ファイルをドロップしてアップロード</Text>
      ) : (
        <>
          <Text>ファイルをドラッグ&ドロップしてアップロード</Text>
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
        </>
      )}
      {/* <Text fontSize="14px" color="gray.500">
        ファイル形式: .jpg .png
      </Text> */}
    </Stack>
  );
};
