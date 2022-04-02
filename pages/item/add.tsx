import {
	Box,
	Button,
	Container,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftAddon,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AddNavbar } from "../teams/add";

interface AddItemProps {}

interface AddItemFormData {
	name: string;
	price: number;
}

const AddItem = ({}: AddItemProps) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<AddItemFormData>();

	const additem = useMutation<any, any, any>((data) => {
		return axios.post("/api/item", data);
	});

	return (
		<Container maxW="container.sm" minH="90vh">
			<Box>
				<AddNavbar title="Dodaj proizvod" />
				<VStack>
					<FormControl isInvalid={false}>
						<FormLabel htmlFor="name">Link</FormLabel>
						<HStack>
							<InputGroup>
								<InputLeftAddon>https://</InputLeftAddon>
								<Input placeholder="www.example.com" />
							</InputGroup>
							<IconButton aria-label="find" icon={<FiSearch />}></IconButton>
						</HStack>
						{false && <FormErrorMessage>{""}</FormErrorMessage>}
					</FormControl>
					<HStack w={"full"}>
						<FormControl isInvalid={!!errors.name}>
							<FormLabel htmlFor="name">Ime</FormLabel>

							<InputGroup>
								<Input
									placeholder="Banana"
									{...register("name", {
										required: {
											value: true,
											message: "Ime je obavezno",
										},
									})}
								/>
							</InputGroup>

							{!!errors?.name?.message ? (
								<FormErrorMessage>
									{errors?.name?.message ?? " "}
								</FormErrorMessage>
							) : (
								<FormHelperText>Ime proizvoda</FormHelperText>
							)}
						</FormControl>
						<FormControl isInvalid={!!errors.price}>
							<FormLabel htmlFor="name">Cijena</FormLabel>

							<InputGroup>
								<Input
									placeholder="23.03"
									{...register("price", {
										required: {
											value: true,
											message: "Cijena je obavezna",
										},
									})}
								/>
							</InputGroup>

							{!!errors.price?.message ? (
								<FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
							) : (
								<FormHelperText>Cijena u kunama</FormHelperText>
							)}
						</FormControl>
					</HStack>
					<Button
						isLoading={additem.isLoading}
						disabled={additem.isLoading}
						onClick={handleSubmit(async (e) => {
							try {
								await additem.mutateAsync({
									name: e.name,
									price: e.price,
								});

								toast("Uspješno dodan proizvod");
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
export default AddItem;
