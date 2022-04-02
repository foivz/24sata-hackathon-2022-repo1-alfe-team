import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSession, signIn, signOut } from "next-auth/react";
import { BiHomeSmile } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { IconButton } from "@chakra-ui/react";

export default function MobileNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        pos="fixed"
        bottom={0}
        width="full"
        left={0}
        // w={{ base: "full", lg: "20px" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"center"}>
          <Stack direction={"row"} justifyContent={"space-around"} width="full">
            <IconButton aria-label="Home" icon={<BiHomeSmile />} />
            <IconButton aria-label="Add new" icon={<BsPlusSquare />} />
            <IconButton aria-label="Setting" icon={<FiSettings />} />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
