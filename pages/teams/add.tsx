import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface AddNavbarProps {
	children?: React.ReactNode | React.ReactNode[];
	title?: string;
}

export const AddNavbar = ({ children, title }: AddNavbarProps) => {
	const router = useRouter();

	return (
		<Box className={`w-full`} h="16">
			<HStack alignItems={"center"} justify="space-between" h="full">
				<IconButton
					onClick={() => {
						router.back();
					}}
					aria-label="back"
					icon={<ArrowBackIcon />}
					variant="ghost"
				></IconButton>
				<Text fontWeight={"semibold"} fontSize={"lg"}>
					{title}
				</Text>
				<IconButton aria-label="back" variant="ghost"></IconButton>
			</HStack>
		</Box>
	);
};

interface AddTeamProps {}

const AddTeam = ({}: AddTeamProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<{ name: string }>();

	const mutation = useMutation<any, any, any>((newTeam) => {
		return axios.post("/api/teams", newTeam);
	});

	const router = useRouter();

	return (
		<Container maxW="container.sm" minH="90vh">
			<Box>
				<AddNavbar title="Dodaj tim" />
				<VStack>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel htmlFor="email">Ime Tima</FormLabel>
						<Input
							placeholder="Super Tim"
							{...register("name", {
								required: {
									value: true,
									message: "Ime je obavezno",
								},
							})}
						/>
						{!!!errors.name?.message && (
							<FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
						)}
					</FormControl>

					<Button
						isLoading={mutation.isLoading}
						disabled={mutation.isLoading || !!errors.name}
						onClick={handleSubmit(async (e) => {
							try {
								await mutation.mutateAsync({
									name: e.name,
								});

								router.replace("/teams/added", {
									query: {
										id: "2323",
									},
								});
							} catch (error) {}
						})}
						w="full"
					>
						Dodaj
					</Button>
				</VStack>
			</Box>
		</Container>
	);
};
export default AddTeam;
