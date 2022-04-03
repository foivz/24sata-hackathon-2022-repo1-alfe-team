import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
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
import Link from "next/link";
import { BiMessage } from "react-icons/bi";



export default function MobileNav({ location }: {location?: string}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  return (
    <>
      <Box p={9}></Box>
      <Box
        px={4}
        shadow={'0px -2px 10px 5px #00000009'}
        pos="fixed"
        bottom={0}
        backgroundColor={useColorModeValue("white", "gray.900")}
        width="full"
        left={0}
        // w={{ base: "full", lg: "20px" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"center"}>
          <Stack direction={"row"} justifyContent={"space-around"} width="full">
            <Link href={'/'}><IconButton backgroundColor={'transparent'} color={location==='home'?'#D1E800':''} aria-label='Home' icon={<VscHome size="26px" />} size="lg" /></Link>
            <Link href={'/chat'}><IconButton backgroundColor={'transparent'} color={location==='chat'?'#D1E800':''} aria-label='Add new' icon={<BiMessage size="26px" />} size="lg" /></Link>
            <Link href={'/settings'}><IconButton backgroundColor={'transparent'} color={location==='settings'?'#D1E800':''} aria-label='Setting' icon={<IoSettingsOutline size="26px" />} size="lg" /></Link>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
