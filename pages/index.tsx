import { TeamsSelect } from "../components/TeamsSelect";
import { Transaction } from "../components/Transaction";
import {
  Avatar,
  AvatarGroup,
  Box,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
  VStack,
  Text,
  Link,
  chakra,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Teams, TeamsAndUser, User } from "@prisma/client";
import { ApiReturn } from "./api/teams";
import { useState } from "react";
import NavBar from "../components/Navbar";
const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("teams", () =>
    fetch("/api/teams").then((res) => res.json())
  );
  const [teamSelect, setTeamsSelect] = useState(0);
  console.log("🔥", data);
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      {data?.map((el: ApiReturn, i) => {
        if (teamSelect == i) return <TeamsSelect el={el} key={el.id} />;
      })}
      <HStack justifyContent="space-between" alignItems="center" mt="10">
        <Heading size="lg" my="auto">
          Last Transactions
        </Heading>
        <Link>
          <Text color="gray.400">see more</Text>
        </Link>
      </HStack>
      <Stack spacing="5" mt="5">
        {[1, 2, 3, 4, 5].map((i) => {
          return <Transaction key={i} />;
        })}
      </Stack>
    </>
  );
};

export default Home;

// http://localhost:3000/api/teams/join?teamId=cl1hspg2y008238e06xhbuwgo
