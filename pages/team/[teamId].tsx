import {
  Box,
  Center,
  chakra,
  ChakraProvider,
  Heading,
  HStack,
  IconButton,
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

  const { isLoading, error, data } = useQuery(`spending-${teamId}`, () =>
    fetch(`/api/spending?teamId=${teamId}`).then((res) => res.json())
  );
  const { data: teamsData } = useQuery(`teams`, () =>
    fetch(`/api/teams`).then((res) => res.json())
  );
  const thisTeamSpending = teamsData?.filter((el: any) => el.id == teamId)[0]
    .spending;
  console.log(data);
  return (
    <Box>
      <HStack p="5" justifyContent="space-between">
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
      <VStack spacing="-1" color="gray.600">
        <Text>spending</Text>
        <Heading color="black">{thisTeamSpending}</Heading>
        <chakra.span fontSize="sm" fontWeight="normal">
          HRK
        </chakra.span>
      </VStack>
      <Tabs>
        <TabList>
          <Tab>Transactions</Tab>
          <Tab>Members</Tab>
          <Tab>Stats</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{}</TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <MobileNav />
    </Box>
  );
};

export default Index;
