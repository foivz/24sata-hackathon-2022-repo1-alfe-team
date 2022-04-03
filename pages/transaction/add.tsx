import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Items } from "@prisma/client";
import axios from "axios";
import {
	chakraComponents,
	GroupBase,
	OptionBase,
	OptionProps,
	Select,
	SingleValueProps,
} from "chakra-react-select";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FiTrash } from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import create from "zustand";
import AddItem from "../item/add";
import { AddNavbar } from "../teams/add";

export const useAddItemStore = create<any>((set: any) => ({
	isOpen: false,
	setIsOpen: (open: any) => set((state: any) => ({ ...state, isOpen: open })),
}));

export interface AddSpendingProps {}

export interface Opp extends OptionBase {
	label: string;
	value: string;
	price?: string;
}

export interface TransFrom {
	items: ItemForm[];
}

export const SelectMenuButton = (props: any) => {
	const { setIsOpen, isOpen } = useAddItemStore();

	return (
		<chakraComponents.MenuList {...props}>
			{props.children}

			<Button
				w={"full"}
				onClick={() => {
					setIsOpen(true);
				}}
				variant={"ghost"}
			>
				Add Your Item
			</Button>
		</chakraComponents.MenuList>
	);
};

export const Option = (props: OptionProps<Opp, false, GroupBase<Opp>>) => {
	return (
		chakraComponents.Option && (
			<chakraComponents.Option {...props}>
				<HStack justify={"space-between"} w="full">
					<Box>{props.data.label}</Box>
					<HStack spacing={1} alignItems={"center"}>
						<Text> {props.data.price}</Text>
						<Text fontWeight={"medium"} fontSize="xs">
							HRK
						</Text>
					</HStack>
				</HStack>
			</chakraComponents.Option>
		)
	);
};

export const Value = (props: SingleValueProps<Opp, false, GroupBase<Opp>>) => {
	return (
		chakraComponents.SingleValue && (
			<chakraComponents.SingleValue {...props}>
				<HStack justify={"space-between"} pr={"7"} textAlign="center" w="full">
					<Box>{props.data.label}</Box>
					<HStack spacing={1} alignItems={"center"}>
						<Text> {props.data.price}</Text>
						<Text fontWeight={"medium"} fontSize="xs">
							HRK
						</Text>
					</HStack>
				</HStack>
			</chakraComponents.SingleValue>
		)
	);
};

export interface ItemForm {
	itemId: string;
	price: number;
	amount: number;
}

const AddSpending = ({}: AddSpendingProps) => {
	const {
		register,
		handleSubmit,
		watch,
		control,
		setError,
		setValue,
		formState: { errors },
	} = useForm<TransFrom>({});

	const { setIsOpen, isOpen } = useAddItemStore();

	const addSpending = useMutation<
		{
			items: { itemId: string; amount: number; price: number };
			teamId: string;
		},
		any,
		any
	>((data) => {
		return axios.post("/api/spending/many", data);
	});

	const items = useQuery<any, any, Items[]>("items", async () => {
		const a = await axios.get("/api/item");

		return a.data;
	});

	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: "items", // unique name for your Field Array
		}
	);

	useEffect(() => {
		append({
			amount: 1,
			price: 0,
			itemId: undefined,
		});
	}, []);

	const router = useRouter();

	return (
		<Container maxW="container.sm" minH="90vh">
			<Box>
				<Modal isOpen={isOpen} onClose={setIsOpen}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Modal Title</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Box h="2" w="full"></Box>

							<AddItem embeded={true} />
							<Box h="6" w="full"></Box>
						</ModalBody>
					</ModalContent>
				</Modal>
				<AddNavbar title="Dodaj transakciju" />
				<VStack spacing={4} w="full">
					{fields.map((field, index) => (
						<VStack alignItems={"start"} w="full" key={index}>
							<HStack w="full" justify={"space-between"}>
								<Text fontSize={"lg"} fontWeight="medium">
									Proizvod {index + 1}
								</Text>
								<IconButton
									aria-label="re"
									variant={"ghost"}
									onClick={() => {
										remove(index);
									}}
									icon={<FiTrash />}
								/>
							</HStack>
							<VStack w="full">
								<FormControl isInvalid={!!errors?.items?.[index]?.itemId}>
									<FormLabel htmlFor="name">Ime Proizvoda</FormLabel>

									<Controller
										control={control}
										name={`items.${index}.itemId`}
										rules={{
											required: "Unesite ime proizvoda",
										}}
										render={({ field: { onChange, value, ref } }) => {
											if (value === "") {
												setError(`items.${index}.itemId`, {
													message: "Unesite ime proizvoda",
												});
											}
											return (
												<Select<Opp, false, GroupBase<Opp>>
													components={{
														Option: Option,
														SingleValue: Value,
														MenuList: SelectMenuButton,
													}}
													ref={ref}
													chakraStyles={{
														container: (props) => ({
															w: "full",
															...props,
														}),
														menuList: (props) => ({
															w: "full",
															...props,
														}),
														valueContainer: (props) => ({
															w: "full",
															...props,
														}),
														singleValue: (props) => ({
															w: "full",
															...props,
														}),
													}}
													onChange={(e) => {
														setValue(
															`items.${index}.price`,
															parseFloat(e?.price ?? "0")
														);
														onChange(e?.value);
													}}
													options={items.data?.map((item: any) => {
														return {
															label: item.name,
															value: item.id,
															price: item.price,
														};
													})}
													placeholder="Select some items..."
													closeMenuOnSelect={true}
													size="md"
												/>
											);
										}}
									/>
								</FormControl>
								<HStack w="full">
									<FormControl isInvalid={!!errors?.items?.[index]?.price}>
										<FormLabel htmlFor="name">Cijena</FormLabel>
										<Input
											{...register(`items.${index}.price`, {
												valueAsNumber: true,
												required: "Unesite količinu",
											})}
										/>
									</FormControl>
									<FormControl isInvalid={!!errors?.items?.[index]?.amount}>
										<FormLabel htmlFor="name">Kom.</FormLabel>
										<Input
											{...register(`items.${index}.amount`, {
												valueAsNumber: true,
												required: "Unesite količinu",
											})}
										/>
									</FormControl>
								</HStack>
							</VStack>
						</VStack>
					))}

					<HStack w={"full"}>
						<Button
							w={"52"}
							onClick={() => {
								console.log();

								append({
									amount: 1,
									price: 0,
									itemId: undefined,
								});
							}}
						>
							Dodaj stavku
						</Button>

						<Button
							// isLoading={mutation.isLoading}
							// disabled={mutation.isLoading || !!errors.name}
							onClick={handleSubmit(async (e) => {
								console.log(e);

								try {
									await addSpending.mutateAsync({
										teamsId: router.query.teamId,
										items: e,
									});

									toast("Uspješno dodano");

									router.push(`/team/${router.query.teamId}`);
								} catch (error) {}
							})}
							w="full"
							textColor={"black"}
							colorScheme={"brand"}
						>
							Dodaj
						</Button>
					</HStack>
				</VStack>
			</Box>
		</Container>
	);
};
export default AddSpending;
