import { TeamsSelect } from "./TeamsSelect";
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
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Teams, TeamsAndUser, User } from "@prisma/client";
const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/teams").then((res) => res.json())
  );
  console.log("🔥", data);
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {data?.map(
        (
          el: Teams & {
            TeamsAndUser: (TeamsAndUser & {
              user: User;
            })[];
            owner: User;
          }
        ) => {
          console.log(el);
          return <TeamsSelect el={el} key={el.id} />;
        }
      )}
      <HStack justifyContent="space-between" alignItems="center" mt="10">
        <Heading size="lg" my="auto">
          Transactions
        </Heading>
        <Link>
          <Text color="gray.400">see more</Text>
        </Link>
      </HStack>
      <Stack spacing="5" mt="5">
        {[1, 2, 3, 4, 5].map((i) => {
          return <Transaction i={i} />;
        })}
      </Stack>
    </>
  );
};

export default Home;
