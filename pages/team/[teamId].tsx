import {
  Box,
  Center,
  chakra,
  ChakraProvider,
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
  const [chart, setChart] = useState("bar");
  const MotionStack = motion(Stack);

  // const { isLoading, error, data } = useQuery(`spending-${teamId}`, () =>
  //   fetch(`/api/spending?teamId=${teamId}`).then((res) => res.json())
  // );
  // const { data: teamsData } = useQuery(`teams`, () =>
  //   fetch(`/api/teams`).then((res) => res.json())
  // );
  // const thisTeamSpending = teamsData?.filter((el: any) => el.id == teamId)[0]
  //   .spending;
  // console.log(data);
  return (
    <Box>
      <HStack zIndex={10} backgroundColor={useColorModeValue('white', 'gray.900')} position={'fixed'} w={'full'} top={0} left={0} px="4" py="2" justifyContent="space-between">
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
        <Heading color="black">{"1 543,34"}</Heading>
        <chakra.span fontSize="sm" fontWeight="normal">
          HRK
        </chakra.span>
      </VStack>
      <Tabs>
        <TabList zIndex={10} backgroundColor={useColorModeValue('white', 'gray.900')} position={"sticky"} top={12} shadow={"md"}>
          <Tab>Transactions</Tab>
          <Tab>Members</Tab>
          <Tab>Stats</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{}</TabPanel>
          <TabPanel p={0}>
            {[0,1,2,3,4,5].map((el: any) => (
              <MemberCard key={el} />
            ))}
          </TabPanel>
          <TabPanel>
            <HStack px={4} py={2}>
              <MotionStack whileTap={{scale: 0.95}} onClick={() => setChart('Bar')} w={12} backgroundColor={chart==='Bar'?'blue.500':'blue.300'} color={'white'} mr={2} h={12} rounded={'md'} shadow={'base'} justifyContent={'center'} alignItems={'center'}>
                <BiBarChart />
              </MotionStack>
              <MotionStack whileTap={{scale: 0.95}} onClick={() => setChart('Pie')} w={12} backgroundColor={chart==='Pie'?'blue.500':'blue.300'} color={'white'} mr={2} h={12} rounded={'md'} shadow={'base'} justifyContent={'center'} alignItems={'center'}>
                <BiPieChart />
              </MotionStack>
            </HStack>
            {/* <Text fontWeight='medium' fontSize={'md'}>Predviđena potrošnja za idući mjesec</Text> */}
            
              {chart==='Bar'?
              <Stack h={'300px'}>
                <Text fontWeight='medium' fontSize={'md'}>Predviđena potrošnja za idući mjesec</Text>
                <BarChart />
              </Stack>  
              :
              <>
                <Text fontWeight='medium' fontSize={'md'}>Potrošnja po članu</Text>
                <Stack h={'300px'} px={10}>
                  <PieChart />
                </Stack>
              </>
              }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Index;
