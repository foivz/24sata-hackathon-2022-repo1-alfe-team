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
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { AddNavbar } from "../teams/add";
import { useAddItemStore } from "../transaction/add";
import { queryClient } from "../_app";

interface AddItemProps {
	embeded?: boolean;
}

interface AddItemFormData {
	name: string;
	price: number;
}

const AddItem = ({ embeded = false }: AddItemProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<AddItemFormData>();

	const additem = useMutation<any, any, any>((data) => {
		return axios.post("/api/item", data);
	});

	const url = useForm<{ url: string }>();

	const { setIsOpen, isOpen } = useAddItemStore();

	const onSubmit = async (e: any) => {
		const a = await axios.get("/api/spending/smart", {
			params: {
				url: e.url,
			},
		});

		if (a.data.status === "SUCCESS") {
			setValue("name", a.data.name);
			setValue("price", a.data.price);
		} else {
			toast("Nije uspjelo parsiranje");
		}
	};

	return (
		<Container maxW="container.sm" minH={!embeded ? "90vh" : "auto"}>
			<Box>
				{!embeded && <AddNavbar title="Dodaj proizvod" />}
				<VStack spacing={embeded ? 4 : 2}>
					<FormControl isInvalid={false}>
						<FormLabel htmlFor="name">Link</FormLabel>
						<HStack>
							<InputGroup>
								{/* <InputLeftAddon>https://</InputLeftAddon> */}
								<Input {...url.register("url")} placeholder="www.example.com" />
							</InputGroup>
							<IconButton
								onClick={() => {
									url.handleSubmit(onSubmit)();
								}}
								aria-label="find"
								icon={<FiSearch />}
							></IconButton>
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

					<HStack w="full">
						{embeded && (
							<Button
								onClick={() => {
									embeded && setIsOpen(false);
								}}
							>
								Close
							</Button>
						)}
						<Button
							colorScheme={"brand"}
							textColor="black"
							isLoading={additem.isLoading}
							disabled={additem.isLoading}
							onClick={handleSubmit(async (e) => {
								try {
									await additem.mutateAsync({
										name: e.name,
										price: e.price,
									});
									queryClient.invalidateQueries("/api/item");
									embeded && setIsOpen(false);
									toast("Uspješno dodan proizvod");
								} catch (error) {}
							})}
							w="full"
						>
							Dodaj
						</Button>
					</HStack>
				</VStack>
			</Box>
		</Container>
	);
};
export default AddItem;
