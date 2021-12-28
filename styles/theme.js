import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
      },
    },
  },
  colors: {
    brand: {
      500: "#f2c94c",
    },
    twitter: "#1da1f2",
  },
});
