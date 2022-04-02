import { ChakraProvider, Container } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import NavBar from "../components/Navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <NavBar />
        <Container maxW="container.xl" minH="90vh">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
