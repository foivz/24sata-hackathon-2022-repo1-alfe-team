import {
	Button,
	Container,
	Text,
	useClipboard,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { AddNavbar } from "./add";

export const isServer = typeof window === "undefined";

interface AddedProps {}

const Added = ({}: AddedProps) => {
	const notify = () => toast("Link kopiran");

	const router = useRouter();

	const us = useClipboard(
		`${isServer ? "" : window.location.origin}/teams/join?id=${router.query.id}`
	);

	return (
		<Container maxW="container.sm" minH="90vh">
			<AddNavbar title="Team added" />
			<VStack spacing={4} align={"start"} mt={4}>
				<Text fontWeight={"medium"} fontSize="md">
					Don’t worry, you can always invite members later.
				</Text>

				<Button
					w="full"
					onClick={() => {
						us.onCopy();
						notify();
					}}
				>
					<Text fontWeight={"medium"} fontSize="md">
						Kopiraj link
					</Text>
				</Button>
			</VStack>
		</Container>
	);
};
export default Added;
