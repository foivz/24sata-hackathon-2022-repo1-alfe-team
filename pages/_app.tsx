import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const theme = extendTheme({
		colors: {
			brand: {
				200: "#ecf87b",
				300: "#eaf86a",
				400: "#e7f75a",
				500: "#E5F64A",
				600: "#C4E935",
				700: "#A4D921",
				800: "#def419",
				900: "#5BB705",
			},
		},
	});
	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<Container maxW="container.xl" minH="90vh" paddingX={0}>
						<Component {...pageProps} />
						<ToastContainer />
					</Container>
				</ChakraProvider>
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
