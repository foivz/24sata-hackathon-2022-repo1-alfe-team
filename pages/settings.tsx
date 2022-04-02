import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Switch, useMediaQuery } from "@chakra-ui/react";
import MobileNav from "../components/MobileNav";
import NavBar from "../components/Navbar";
import { useColorMode } from "@chakra-ui/react";
const Settings = () => {
    const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            {isLargerThan800 ? <NavBar /> : null}
            <Box p={4}>
                <Heading pb={2}>Settings</Heading>
                <HStack justifyContent={'space-between'}>
                    <Text fontSize={'md'} fontWeight={'medium'}>Dark Mode</Text>
                    <Switch 
                        size={'md'}
                        isChecked={colorMode === 'dark'}
                        onChange={toggleColorMode}
                    />
                </HStack>
            </Box>
            {isLargerThan800 ? null : <MobileNav location="settings" />}
        </>
    )
}

export default Settings;