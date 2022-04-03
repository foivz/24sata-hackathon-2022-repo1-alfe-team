import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/layout";
import { Button, Switch, useMediaQuery } from "@chakra-ui/react";
import MobileNav from "../components/MobileNav";
import NavBar from "../components/Navbar";
import { useColorMode } from "@chakra-ui/react";
import { signOut } from "next-auth/react";


const Settings = () => {
    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            {isLargerThan800 ? <NavBar /> : null}
            <Stack p={4} alignItems={'center'} >
                <Heading pb={2} w={'full'}>Settings</Heading>
                <HStack w={'full'} justifyContent={'space-between'}>
                    <Text fontSize={'md'} fontWeight={'medium'}>Dark Mode</Text>
                    <Switch 
                        size={'md'}
                        isChecked={colorMode === 'dark'}
                        onChange={toggleColorMode}
                    />
                </HStack>
                <Button mt={4} backgroundColor={'red.500'} color={'white'} onClick={() => signOut()} w={'190px'}>Log out</Button>
            </Stack>
            {isLargerThan800 ? null : <MobileNav location="settings" />}
        </>
    )
}

export default Settings;