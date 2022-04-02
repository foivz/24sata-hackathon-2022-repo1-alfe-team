import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	HStack,
	IconButton,
	Input,
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
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { AddNavbar } from "../teams/add";

interface AddSpendingProps {}

interface Opp extends OptionBase {
	label: string;
	value: string;
	price?: string;
}

interface TransFrom {
	items: ItemForm[];
}

const Option = (props: OptionProps<Opp, false, GroupBase<Opp>>) => {
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

const Value = (props: SingleValueProps<Opp, false, GroupBase<Opp>>) => {
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
	} = useForm<TransFrom>();

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

	const router = useRouter();

	return (
		<Container maxW="container.sm" minH="90vh">
			<Box>
				<AddNavbar title="Dodaj transakciju" />
				<VStack w="full">
					{fields.map((field, index) => (
						<VStack alignItems={"start"} w="full" key={index}>
							<HStack w="full" justify={"space-between"}>
								<Text fontSize={"lg"} fontWeight="medium">
									Proizvod {index + 1}
								</Text>
								<IconButton
									aria-label="re"
									onClick={() => {
										remove(index);
									}}
									icon={<FiX />}
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
													}}
													ref={ref}
													chakraStyles={{
														container: (props) => ({
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
															parseInt(e?.price ?? "0")
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

					<Button
						onClick={() => {
							console.log();

							append({
								amount: 1,
								price: 0,
								itemId: undefined,
							});
						}}
					>
						Dodaj
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
					>
						Dodaj
					</Button>
				</VStack>
			</Box>
		</Container>
	);
};
export default AddSpending;
