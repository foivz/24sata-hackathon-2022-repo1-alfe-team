import {
  Box,
  Center,
  chakra,
  ChakraProvider,
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
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { FiChevronLeft, FiSettings } from "react-icons/fi";
import MobileNav from "../../components/MobileNav";
import { GetServerSideProps } from "next";
import MemberCard from "../../components/MemberCard";
import { userInfo } from "os";
import { useColorModeValue } from "@chakra-ui/system";
import { BarChart } from "../../components/BarChart";
import { BiBarChart, BiPieChart } from "react-icons/bi";
import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart } from "../../components/PieChart";

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
  const thisTeam = teamsData?.filter((el: any) => el.id == teamId)[0];

  const thisTeamSpending = thisTeam?.spending;
  console.log(thisTeam?.TeamsAndUser);
  console.log("😥😥😥", teamsData);
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
        <Heading size="sm">Team Alfe</Heading>
        <IconButton
          aria-label="Search database"
          icon={<FiSettings />}
          variant="ghost"
        />
      </HStack>
      <Box p={6}></Box>
      <VStack spacing="-1" color="gray.600">
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
          shadow={"md"}
        >
          <Tab>Transactions</Tab>
          <Tab>Members</Tab>
          <Tab>Stats</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{}</TabPanel>
          <TabPanel p={0}>
            <Stack>
              {thisTeam?.TeamsAndUser?.map((el: any) => {
                console.log("🔥🔥🔥🔥🔥🔥🔥", el);
                return (
                  <MemberCard
                    key={el.id}
                    userId={el.userId}
                    userImage={el.user.images}
                    username={el.user.name}
                    userMonthlySpending={el.user.monthlySpending}
                    userType={el.user.role}
                  />
                );
              })}
            </Stack>
          </TabPanel>
          <TabPanel>
            {/* <Text fontWeight='medium' fontSize={'md'}>Predviđena potrošnja za idući mjesec</Text> */}

            <Stack justifyContent={'end'}>
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
