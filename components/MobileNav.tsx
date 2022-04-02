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
      <Box
        px={4}
        shadow={'0px -2px 10px 5px #00000009'}
        pos="fixed"
        bottom={0}
        width="full"
        left={0}
        // w={{ base: "full", lg: "20px" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"center"}>
          <Stack direction={"row"} justifyContent={"space-around"} width="full">
            <IconButton backgroundColor={'transparent'} aria-label='Home' icon={<VscHome size="26px" />} size="lg" />
            <IconButton backgroundColor={'#D1E800'} shadow={"lg"} aria-label='Add new' icon={<BsPlusSquare size="26px" color="white" />} size="lg" />
            <IconButton backgroundColor={'transparent'} aria-label='Setting' icon={<IoSettingsOutline size="26px" />} size="lg" />
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
