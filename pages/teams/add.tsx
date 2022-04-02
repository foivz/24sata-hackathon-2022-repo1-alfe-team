import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
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
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

interface AddTeamProps {}

const AddTeam = ({}: AddTeamProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<{ name: string }>();

	const mutation = useMutation((newTeam) => {
		return axios.post("/api/teams", newTeam);
	});

	return (
		<Box>
			<Box className={`w-full`} h="16">
				<HStack alignItems={"center"} justify="space-between" h="full">
					<IconButton
						aria-label="back"
						icon={<ArrowBackIcon />}
						variant="ghost"
					></IconButton>
					<Text fontWeight={"semibold"} fontSize={"lg"}>
						Create Team
					</Text>
					<IconButton aria-label="back" variant="ghost"></IconButton>
				</HStack>
				<VStack>
					<FormControl isInvalid={!!errors.name}>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
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

					<Button w="full">Dodaj</Button>
				</VStack>
			</Box>
		</Box>
	);
};
export default AddTeam;
