import {
  Stack,
  Heading,
  HStack,
  AvatarGroup,
  Avatar,
  Box,
  Text,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import React from "react";
export function TeamsSelect({ el, i }) {
  return (
    <Stack
      key={el.id}
      w={"full"} // bgColor={useColorModeValue("gray.50", "gray.700")}
      rounded="lg" // shadow={useColorModeValue("lg", "sm")}
      _hover={{
        opacity: 0.95,
        shadow: "md",
      }}
      padding="7"
      minH={{
        base: "52",
        md: "64",
      }}
      justifyContent="space-between"
    >
      <Heading size="lg">{el.name}</Heading>
      <HStack justifyContent="space-between" alignItems="center">
        <AvatarGroup>
          {el.TeamsAndUser.map((el, i) => (
            <Avatar key={el.id} size="md" src={el.user.image} />
          ))}
        </AvatarGroup>
        <Box>
          <Text>Spending</Text>
          <Heading>
            <chakra.span fontSize="sm" fontWeight="normal">
              {" "}
              HRK
            </chakra.span>
          </Heading>
        </Box>
      </HStack>
    </Stack>
  );
}
