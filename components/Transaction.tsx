import {
  HStack,
  Avatar,
  Stack,
  Heading,
  chakra,
  Text,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
export function Transaction({
  itemName,
  username,
  userId,
  amount,
  totalPrice,
  userImage,
  index,
  nodate,
}: {
  itemName: string;
  username: string;
  amount: number;
  totalPrice: number;
  userId: string;
  userImage: string;
  index?: number;
  nodate?: boolean;
}) {
  const MHStack = motion(HStack);
  console.log("🌙🌙🌙", index);
  return (
    <MHStack
    justifyContent="space-between" paddingX={2}>
      <HStack alignItems={"center"} height={"min-content"}>
        <Avatar
          src={
            userImage || `https://avatars.dicebear.com/api/micah/${userId}.svg`
          }
          backgroundColor={"white"}
          style={{ border: "1px solid #CCC" }}
          size="md"
          marginRight={2}
        />
        <Stack spacing={0}>
          <Heading size="sm" fontWeight={"medium"}>
            {itemName} {amount == 1 ? "" : `x${amount}`}
          </Heading>
          <Link href={userId}>
            <Text>{username}</Text>
          </Link>
        </Stack>
      </HStack>
      <Stack textAlign="right" spacing={-1}>
        <Text fontWeight="medium" fontSize="lg">
          {totalPrice}{" "}
          <chakra.span fontWeight="normal" fontSize="xs" color={"gray.400"}>
            HRK
          </chakra.span>
        </Text>
        <Text fontWeight="normal" fontSize="sm" color="gray.400">
          {nodate?'spent':'May 26, 2022'}
        </Text>
      </Stack>
    </MHStack>
  );
}
