import { ChakraProvider, Container } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider>
					<Container maxW="container.xl" minH="90vh">
						<Component {...pageProps} />
						<ToastContainer />
					</Container>
				</ChakraProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
