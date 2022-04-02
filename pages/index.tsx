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
const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/teams").then((res) => res.json())
  );
  console.log("🔥", data);
  return (
    <>
      <Stack
        w={"full"}
        bgColor={useColorModeValue("gray.50", "gray.700")}
        rounded="lg"
        shadow={useColorModeValue("lg", "sm")}
        _hover={{ opacity: 0.95, shadow: "md" }}
        padding="7"
        minH={{ base: "52", md: "64" }}
        justifyContent="space-between"
      >
        <Heading size="lg">Team Alfe</Heading>
        <HStack justifyContent="space-between" alignItems="center">
          <AvatarGroup>
            {[1, 2, 3, 4].map((i) => (
              <Avatar key={i} size="md"></Avatar>
            ))}
          </AvatarGroup>
          <Box>
            <Text>Spending</Text>
            <Heading>
              1352,53
              <chakra.span fontSize="sm" fontWeight="normal">
                {" "}
                HRK
              </chakra.span>
            </Heading>
          </Box>
        </HStack>
      </Stack>
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
