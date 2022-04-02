import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import {
  BsInfo,
  BsInfoCircle,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";

const MemberCard = ({
  userMonthlySpending,
  username,
  userId,
  userImage,
  userType,
}: {
  userMonthlySpending: number;
  username: string;
  userType: string;
  userImage: string;
  userId: string;
}) => {
  const [open, setOpen] = useState(false);
  const MotionStack = motion(Stack);
  return (
    <Stack p={5} shadow={"md"} rounded={"lg"}>
      <HStack justifyContent={"space-between"} alignItems={"start"}>
        <HStack spacing={4}>
          <Avatar name={username} size="md" />
          <Stack spacing={0}>
            <Heading size="md">{username}</Heading>
            <Text color={"gray.400"}>{userType}</Text>
          </Stack>
        </HStack>
        <Stack justifyContent={"end"}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical />}
              variant="ghost"
            />
            <MenuList p={0} overflow={"hidden"}>
              <MenuItem
                // fontSize={"lg"}
                py={2}
                backgroundColor={"red.500"}
                _focus={{ backgroundColor: "red.500" }}
                _hover={{ backgroundColor: "red.600" }}
                textColor={"white"}
                // fontWeight={"medium"}
                icon={<BiTrash size={16} />}
              >
                Remove
              </MenuItem>
              <MenuItem
                // fontSize={"lg"}
                py={2}
                _hover={{ backgroundColor: "gray.100" }}
                // fontWeight={"medium"}
                icon={<BsInfoCircle size={16} />}
              >
                Info
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </HStack>
      <HStack justifyContent={"end"} alignItems={"end"}>
        <Stack spacing="-1">
          <Text fontSize={12} color={"gray.400"}>
            monthly spending
          </Text>
          <HStack alignItems="flex-end">
            <Text
              fontSize={24}
              fontWeight={"medium"}
              lineHeight={1.2}
              color={"gray.800"}
            >
              {userMonthlySpending}
            </Text>
            <Text fontSize={12} color={"gray.400"}>
              {"HRK"}
            </Text>
          </HStack>
        </Stack>
        {/* </HStack> */}
      </HStack>
    </Stack>
    // </Container>
  );
};

export default MemberCard;
