import "focus-visible/dist/focus-visible";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { Header } from "../components/Header";
import { useAuth } from "../lib/auth";
import { RecoilRoot } from "recoil";

const Auth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const isLoading = useAuth();

  return isLoading ? <p>Loading...</p> : children;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </Auth>
    </RecoilRoot>
  );
}

export default MyApp;
