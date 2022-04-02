import { ChakraProvider, Container, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import "../styles/globals.css";

const queryClient = new QueryClient();
export const TransactionContext = createContext<any>(null);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const [transaction, setTransaction] = useState(null)

	const theme = extendTheme({
		colors: {
			brand: {
				500: "#E5F64A",
				600: "#C4E935",
				700: "#A4D921",
				800: "#7BCB0E",
				900: "#5BB705",
			}
		}
	});

	return (
		<SessionProvider session={session}>
			<TransactionContext.Provider value={[transaction, setTransaction]}>
				<QueryClientProvider client={queryClient}>
					<ChakraProvider theme={theme} >
						<Container maxW="container.xl" minH="90vh" paddingX={0}>
							<Component {...pageProps}/>
							<ToastContainer />
						</Container>
					</ChakraProvider>
				</QueryClientProvider>
			</TransactionContext.Provider>
		</SessionProvider>
	);
}

export default MyApp;
