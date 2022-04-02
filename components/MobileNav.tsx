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
import { VscHome } from 'react-icons/vsc';
import { BsPlusSquare } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';
import { IconButton } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



export default function MobileNav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} pos="fixed" bottom={0} width="full" left={0}>
        <Flex h={16} alignItems={"center"} justifyContent={"center"}>
          <Stack direction={"row"} justifyContent={"space-around"} width="full">
            <IconButton aria-label='Home' icon={<VscHome size="32px" />} size="lg" />
            <IconButton aria-label='Add new' icon={<BsPlusSquare size="32px" />} size="lg" />
            <IconButton aria-label='Setting' icon={<IoSettingsOutline size="32px" />} size="lg" />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
