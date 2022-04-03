import {
	Box,
	Flex,
	IconButton,
	Stack,
	useColorMode,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { VscHome } from "react-icons/vsc";

export default function MobileNav({ location }: { location?: string }) {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data: session } = useSession();
	return (
		<>
			<Box p={9}></Box>
			<Box
				px={4}
				shadow={"0px -2px 10px 5px #00000009"}
				pos="fixed"
				bottom={0}
				backgroundColor={useColorModeValue("white", "gray.900")}
				width="full"
				left={0}
				// w={{ base: "full", lg: "20px" }}
			>
				<Flex h={16} alignItems={"center"} justifyContent={"center"}>
					<Stack direction={"row"} justifyContent={"space-around"} width="full">
						<Link href={"/"}>
							<IconButton
								backgroundColor={
									location === "home" ? "#D1E800" : "transparent"
								}
								shadow={location === "home" ? "lg" : ""}
								color={location === "home" ? "white" : ""}
								aria-label="Home"
								icon={<VscHome size="26px" />}
								size="lg"
							/>
						</Link>
						{/* <IconButton backgroundColor={'transparent'} aria-label='Add new' icon={<BsPlusSquare size="26px" />} size="lg" /> */}
						<Link href={"/settings"}>
							<IconButton
								backgroundColor={
									location === "settings" ? "#D1E800" : "transparent"
								}
								shadow={location === "settings" ? "lg" : ""}
								color={location === "settings" ? "white" : ""}
								aria-label="Setting"
								icon={<IoSettingsOutline size="26px" />}
								size="lg"
							/>
						</Link>
					</Stack>
				</Flex>
			</Box>
		</>
	);
}
