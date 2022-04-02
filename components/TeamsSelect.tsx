import {
  Stack,
  Heading,
  HStack,
  AvatarGroup,
  Avatar,
  Box,
  Text,
  Center,
} from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import { ApiReturn } from "../pages/api/teams/index";
import React from "react";
import { elementDragControls } from "framer-motion/types/gestures/drag/VisualElementDragControls";
import { motion } from "framer-motion";
export function TeamsSelect({ el }: { el: ApiReturn }) {
  const allTeamMembers = [el.owner, ...el.TeamsAndUser];
  console.log(allTeamMembers);
  const MotionStack = motion(Stack);
  return (
    <Center>
      <MotionStack
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}

        maxW="container.sm"
        key={el.id}
        w={"full"} //
        bgColor={useColorModeValue("gray.50", "gray.700")}
        rounded="lg" //
        shadow={useColorModeValue("lg", "sm")}
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
            {allTeamMembers?.map((el, i) => (
              <Avatar
                key={el.id}
                size="md"
                src={el?.user?.image || el?.image}
              />
            ))}
          </AvatarGroup>
          <Box>
            <Text>Spending</Text>
            <Heading>
              {el.spending}
              <chakra.span fontSize="sm" fontWeight="normal">
                {" "}
                HRK
              </chakra.span>
            </Heading>
          </Box>
        </HStack>
      </MotionStack>
    </Center>
  );
}
