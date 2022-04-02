import {
	Box,
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
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronLeft, FiSettings } from "react-icons/fi";
import { useQuery } from "react-query";
import { TransactionsDisplay } from "..";
import { BarChart } from "../../components/BarChart";
import MemberCard from "../../components/MemberCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
	// const { teamId } = ctx.query;
	// const res = await fetch(`/api/spending?teamId=${teamId}`);
	// const data = await res.json();
	return {
		props: {
			teamId: 1,
		},
	};
};

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
	const { isLoading, error, data } = useQuery(`spending-${teamId}`, () =>
		fetch(`/api/spending?teamId=${teamId}`).then((res) => res.json())
	);
	const { data: teamsData } = useQuery(`teams`, () =>
		fetch(`/api/teams`).then((res) => res.json())
	);
	const { data: spendingPerUser } = useQuery(`spendingPerUser`, () =>
		fetch(`/api/spending/perUser?teamId=${teamId}`).then((res) => res.json())
	);
	const thisTeam = teamsData?.filter((el: any) => el.id == teamId)[0];
	console.log("spendingPerUser", spendingPerUser);
	const thisTeamSpending = thisTeam?.spending;
	console.log(thisTeam?.TeamsAndUser);

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
				<Text>spending</Text>
				<Heading color="black">{thisTeamSpending}</Heading>
				<chakra.span fontSize="sm" fontWeight="normal">
					HRK
				</chakra.span>
			</VStack>
			<Tabs>
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
						<TransactionsDisplay id={thisTeam?.id} />
					</TabPanel>
					<TabPanel p={0}>
						<Stack px={4} py={4}>
							<MemberCard
								key={thisTeam?.id}
								userId={thisTeam?.ownerId}
								userImage={thisTeam?.owner?.images}
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
										userImage={el.user.images}
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
							<BarChart />
						</Stack>
					</TabPanel>
					<TabPanel></TabPanel>
				</TabPanels>
			</Tabs>
		</Container>
	);
};

export default Index;
