/* eslint-disable react-hooks/rules-of-hooks */
import {
	Box,
	Button,
	chakra,
	Container,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { Items } from "@prisma/client";
import axios from "axios";
import { GroupBase, Select } from "chakra-react-select";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { BiBrain } from "react-icons/bi";
import {
	FiCheck,
	FiChevronLeft,
	FiPlus,
	FiSettings,
	FiTrash,
	FiX,
} from "react-icons/fi";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { TransactionsDisplay } from "..";
import { BarChart } from "../../components/BarChart";
import MemberCard from "../../components/MemberCard";
import { Transaction } from "../../components/Transaction";
import AddItem from "../item/add";
import {
	Opp,
	Option,
	SelectMenuButton,
	useAddItemStore,
	Value,
} from "../transaction/add";

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
const Index = (props: any) => {
	const router = useRouter();
	const { teamId } = router.query;
	const [divider, setDivider] = useState(1);
	// const { isLoading, error, data } = useQuery("teams", () =>
	//   fetch("/api/teams").then((res) => res.json())
	const [chart, setChart] = useState("Bar");
	const MotionStack = motion(Stack);

	// const { isLoading, error, data } = useQuery(`spending-${teamId}`, () =>
	//   fetch(`/api/spending?teamId=${teamId}`).then((res) => res.json())
	// );
	// const { data: teamsData } = useQuery(`teams`, () =>
	//   fetch(`/api/teams`).then((res) => res.json())
	// );
	// console.log("🔥🔥🔥", data);

	const { data: teamsData } = useQuery(`teams`, () =>
		fetch(`/api/teams`).then((res) => res.json())
	);
	const { data: spendingPerUser } = useQuery(`spendingPerUser`, () =>
		fetch(`/api/spending/perUser?teamId=${teamId}`).then((res) => res.json())
	);

	const thisTeam = teamsData?.filter((el: any) => el.id == teamId)[0];
	console.log("spendingPerUser", spendingPerUser);
	const thisTeamSpending = thisTeam?.spending ?? 0;
	console.log(thisTeam?.TeamsAndUser);
	const [mth, setMth] = useState(0);
	const { data: spendingPerUserPerMonth } = useQuery(
		`spendingPerUserPerMonth`,
		() =>
			fetch(
				`http://localhost:3000/api/spending/perUserPerMonth?teamId=${teamId}`
			).then((res) => res.json())
	);
	return (
		<Container maxW="container.lg" paddingX={0}>
			<HStack
				zIndex={10}
				backgroundColor={useColorModeValue("white", "gray.900")}
				position={"fixed"}
				w={"full"}
				top={0}
				left={0}
				px="4"
				py="2"
				justifyContent="space-between"
			>
				<IconButton
					aria-label="Search database"
					icon={<FiChevronLeft />}
					variant="ghost"
					onClick={() => router.push(`/`)}
				/>
				<Heading size="sm">{thisTeam?.name}</Heading>
				<IconButton
					aria-label="Search database"
					icon={<FiSettings />}
					onClick={() => router.push(`/settings`)}
					variant="ghost"
				/>
			</HStack>
			<Box p={6}></Box>
			<VStack
				spacing="-1"
				color="gray.600"
				backgroundColor={useColorModeValue("white", "gray.900")}
			>
				{/* <Text color={useColorModeValue("gray.800", "gray.400")}>spending</Text> */}
				<Heading color={useColorModeValue("brand.800", "brand.400")}>
					{thisTeamSpending.toFixed(2)}
				</Heading>
				<chakra.span
					color={useColorModeValue("gray.800", "gray.400")}
					fontSize="sm"
					fontWeight="normal"
				>
					HRK
				</chakra.span>
			</VStack>
			<Tabs colorScheme={"brand"}>
				<TabList
					zIndex={10}
					backgroundColor={useColorModeValue("white", "gray.900")}
					position={"sticky"}
					top={12}
					// shadow={"md"}
				>
					<Tab>Transactions</Tab>
					<Tab>Members</Tab>
					<Tab>Stats</Tab>
					<Tab>Shopping List</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<TransactionsDisplay key={"test"} id={thisTeam?.id || undefined} />
						<Button
							colorScheme={"brand"}
							textColor="black"
							w="full"
							mt={8}
							onClick={() => {
								router.push(`/transaction/add?teamId=${thisTeam?.id}`);
							}}
							leftIcon={<FiPlus />}
						>
							Add transaction
						</Button>
					</TabPanel>
					<TabPanel p={0}>
						<Stack px={4} py={4}>
							<MemberCard
								key={thisTeam?.id}
								userId={thisTeam?.ownerId}
								userImage={thisTeam?.owner?.image}
								username={thisTeam?.owner?.name}
								userMonthlySpending={
									(spendingPerUser && spendingPerUser?.[thisTeam?.ownerId]) || 0
								}
								userType={thisTeam?.owner?.role}
							/>
							{thisTeam?.TeamsAndUser?.map((el: any) => {
								return (
									<MemberCard
										key={el.id}
										userId={el.userId}
										userImage={el.user.image}
										username={el.user.name}
										userMonthlySpending={
											(spendingPerUser && spendingPerUser[el.userId]) || 0
										}
										userType={el.user.role}
									/>
								);
							})}
						</Stack>
					</TabPanel>
					<TabPanel>
						{/* <Text fontWeight='medium' fontSize={'md'}>Predviđena potrošnja za idući mjesec</Text> */}

						<Stack justifyContent={"end"}>
							<Stack alignItems={"center"}>
								<BarChart
									setDivider={(e: number) => setDivider(e)}
									data={spendingPerUserPerMonth}
									setMth={(e) => setMth(e)}
								/>
							</Stack>
							<Text fontWeight={"medium"} px={4}>
								{mth === 4
									? `Predicted Spending ${months[mth]}`
									: `Spending ${months[mth]}`}
							</Text>
							<Transaction
								key={thisTeam?.id}
								amount={1}
								index={0}
								userId={thisTeam?.ownerId}
								userImage={thisTeam?.owner?.image}
								itemName={thisTeam?.owner?.name}
								totalPrice={
									mth === 4
										? (spendingPerUserPerMonth &&
												spendingPerUserPerMonth?.[mth - 1][thisTeam?.ownerId]) *
												divider || 0
										: (spendingPerUserPerMonth &&
												spendingPerUserPerMonth?.[mth][thisTeam?.ownerId]) ||
										  0
								}
								username={thisTeam?.owner?.role}
								nodate={true}
							/>
							{thisTeam?.TeamsAndUser?.map((el: any) => {
								return (
									<Transaction
										key={thisTeam?.id}
										amount={1}
										index={0}
										userId={el.userId}
										userImage={el.user.image}
										itemName={el.user.name}
										totalPrice={
											mth === 4
												? (spendingPerUserPerMonth &&
														spendingPerUserPerMonth?.[mth - 1][el.userId]) *
														divider || 0
												: (spendingPerUserPerMonth &&
														spendingPerUserPerMonth?.[mth][el.userId]) ||
												  0
										}
										username={el.user.role}
										nodate={true}
									/>
								);
							})}
						</Stack>
					</TabPanel>
					<TabPanel>
						<ShoppingList />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
};

interface AddSpendingProps {}

export interface ItemForm2 {
	itemId: string;
	price: number;
	isChecked: boolean;
	amount: number;
}
export interface TransFrom2 {
	items: ItemForm2[];
}

const ShoppingList = ({}: AddSpendingProps) => {
	const {
		register,
		handleSubmit,
		watch,
		control,
		setError,
		setValue,

		formState: { errors },
	} = useForm<TransFrom2>({});

	const { setIsOpen, isOpen } = useAddItemStore();

	const addSpending = useMutation<
		{
			items: ItemForm2;
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

	const { fields, append, prepend, remove, swap, move, insert, update } =
		useFieldArray({
			control, // control props comes from useForm (optional: if you are using FormContext)
			name: "items", // unique name for your Field Array
		});

	const a = watch("items");

	useEffect(() => {
		try {
			if (localStorage.getItem("data") != null) {
				setValue("items", JSON.parse(localStorage.getItem("data") ?? "[]"));
			}
		} catch (error) {}
	}, []);

	const [s, setS] = useState<string>("");

	useEffect(() => {
		console.log(a);
		let keys = [] as any;

		if (a?.length > 2) {
			a.forEach((aa) => {
				console.log(
					"ererer",
					items.data?.filter((el) => el.id === aa.itemId)?.[0]?.name
				);

				keys.push(items.data?.filter((el) => el.id === aa.itemId)?.[0]?.name);
			});

			setS(keys.join(", "));
		}

		localStorage.setItem("data", JSON.stringify(a));
	}, [JSON.stringify(a), items.isLoading]);

	const router = useRouter();

	return (
		<Container maxW="container.sm">
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
				<VStack spacing={4} w="full">
					<HStack w="full" justify={"space-between"}>
						<Text fontSize={"xl"} fontWeight="medium">
							Shoping List
						</Text>
						<Box>
							<Button
								onClick={async () => {
									const rr = await axios.get("/api/openai", {
										params: {
											type: "items_recommend_for_event",
											manual_add: s,
										},
									});

									console.log(rr.data);
								}}
								variant={"outline"}
								leftIcon={<BiBrain />}
							>
								Enhance
							</Button>
						</Box>
					</HStack>

					{fields.map((field, index) => (
						<VStack alignItems={"start"} w="full" key={index}>
							<HStack w="full" justify={"space-between"}>
								<Text fontSize={"lg"} fontWeight="medium">
									Proizvod {index + 1}
								</Text>
								<Box>
									<IconButton
										aria-label="re"
										variant={"ghost"}
										onClick={() => {
											setValue(`items.${index}.isChecked`, !a[index].isChecked);
										}}
										icon={!a[index].isChecked ? <FiCheck /> : <FiX />}
									/>
									<IconButton
										aria-label="re"
										variant={"ghost"}
										onClick={() => {
											remove(index);
										}}
										icon={<FiTrash />}
									/>
								</Box>
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
													value={items.data
														?.filter((t) => t.id === value)
														.map((item: any) => {
															return {
																label: item.name,
																value: item.id,
																price: item.price,
															};
														})}
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

								{a[index]?.isChecked && (
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
								)}
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
										items: e.items.filter((i) => i.isChecked),
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

Index.getInitialProps = () => {
	return {};
};

export default Index;
