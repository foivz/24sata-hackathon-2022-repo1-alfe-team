import {
	Box,
	Button,
	Container,
	FormLabel,
	HStack,
	IconButton,
	Text,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import {
	chakraComponents,
	GroupBase,
	OptionBase,
	OptionProps,
	Select,
} from "chakra-react-select";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
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
	console.log(props);

	return (
		chakraComponents.Option && (
			<chakraComponents.Option {...props}>
				<HStack justify={"space-between"} w="full">
					<Box>{props.data.label}</Box>
					<HStack>
						<Text> {props.data.price}</Text>
						<Text fontSize="xs">HRK</Text>
					</HStack>
				</HStack>
			</chakraComponents.Option>
		)
	);
};

export interface ItemForm {
	itemId: string;
	amount: number;
}

const AddSpending = ({}: AddSpendingProps) => {
	const {
		register,
		handleSubmit,
		watch,
		control,

		formState: { errors },
	} = useForm<TransFrom>();

	const addSpending = useMutation<any, any, any>((data) => {
		return axios.post("/api/spending", data);
	});

	const items = useQuery<any, any, any>("items", async () => {
		const a = await axios.get("/api/item");

		return a.data;
	});

	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
		{
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: "items", // unique name for your Field Array
		}
	);

	console.log(items.data);

	return (
		<Container maxW="container.sm" minH="90vh">
			<Box>
				<AddNavbar title="Dodaj transakciju" />
				<VStack w="full">
					{fields.map((field, index) => (
						<VStack alignItems={"start"} w="full" key={index}>
							<HStack>
								<Box>
									<FormLabel htmlFor="name">Proizvod {index + 1}</FormLabel>
									<Controller
										control={control}
										name={`items.${index}.itemId`}
										render={({ field: { onChange, value, ref } }) => (
											<Select<Opp, false, GroupBase<Opp>>
												components={{
													Option: Option,
												}}
												ref={ref}
												chakraStyles={{
													container: (props) => ({
														w: "full",
														...props,
													}),
												}}
												onChange={(e) => {
													onChange(e?.value);
												}}
												options={items.data?.map((item: any) => {
													return {
														label: item.name,
														value: item.id,
														price: item.price,
													};
												})}
												placeholder="Select some colors..."
												closeMenuOnSelect={true}
												size="md"
											/>
										)}
									/>
								</Box>
								<IconButton aria-label="re" icon={<FiX />}></IconButton>
							</HStack>
						</VStack>
					))}

					<Button
						onClick={() => {
							append({
								amount: 0,
								itemId: "",
							});
						}}
					>
						Dodaj
					</Button>

					{/* <Button
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
					</Button> */}
				</VStack>
			</Box>
		</Container>
	);
};
export default AddSpending;
