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
  chakra,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
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
    </>
  );
};

export default Home;
