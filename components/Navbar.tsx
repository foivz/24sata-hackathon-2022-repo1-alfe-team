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

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} mb="5">
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Image src={useColorModeValue("logo-light.png","logo-dark.png")} w="24" />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} variant={"ghost"}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {session ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={session.user?.image || ""} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={session.user?.image || ""} />
                    </Center>
                    <br />
                    <Center>
                      <p>{session.user?.name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Vaš Profil</MenuItem>
                    <MenuItem onClick={() => signOut()}>Odjava</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button variant={"ghost"} onClick={() => signIn()}>
                  Login
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
