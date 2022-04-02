import { HStack, Avatar, Stack, Heading, chakra, Text } from "@chakra-ui/react";
import React from "react";
export function Transaction({ i }) {
  return (
    <HStack key={i} justifyContent="space-between">
      <HStack>
        <Avatar size="md"></Avatar>
        <Stack>
          <Heading size="sm">Kruh</Heading>
          <Text>Luka Počinok</Text>
        </Stack>
      </HStack>
      <Stack textAlign="right">
        <Text fontWeight="medium" fontSize="md">
          8.75{" "}
          <chakra.span fontWeight="normal" fontSize="sm">
            HRK
          </chakra.span>
        </Text>
        <Text fontWeight="normal" fontSize="sm" color="gray.400">
          May 26, 2022
        </Text>
      </Stack>
    </HStack>
  );
}
