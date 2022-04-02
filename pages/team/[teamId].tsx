/* eslint-disable react-hooks/rules-of-hooks */
import {
	Box,
	Button,
	chakra,
	Container,
	Heading,
	HStack,
	IconButton,
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
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronLeft, FiPlus, FiSettings } from "react-icons/fi";
import { useQuery } from "react-query";
import { TransactionsDisplay } from "..";
import { BarChart } from "../../components/BarChart";
import MemberCard from "../../components/MemberCard";
import { Transaction } from "../../components/Transaction";

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
				<Text color={useColorModeValue("gray.800", "gray.400")}>spending</Text>
				<Heading color={useColorModeValue("brand.800", "brand.400")}>
					{thisTeamSpending}
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
								router.push(`/transactions/transaction?teamId=${thisTeam?.id}`);
							}}
							leftIcon={<FiPlus />}
						>
							Add transaction
						</Button>
					</TabPanel>
					<TabPanel p={0}>
						<Stack px={4} py={4}>
							<MemberCard
								owner={true}
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
										owner={false}
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
							<BarChart setMth={(e) => setMth(e)} />
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
								userImage={thisTeam?.owner?.images}
								itemName={thisTeam?.owner?.name}
								totalPrice={
									(spendingPerUser && spendingPerUser?.[thisTeam?.ownerId]) || 0
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
										userImage={el.user.images}
										itemName={el.user.name}
										totalPrice={
											(spendingPerUser &&
												spendingPerUser?.[thisTeam?.userId]) ||
											0
										}
										username={el.user.role}
										nodate={true}
									/>
								);
							})}
						</Stack>
					</TabPanel>
					<TabPanel></TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
};

Index.getInitialProps = () => {
	return {};
};

export default Index;
