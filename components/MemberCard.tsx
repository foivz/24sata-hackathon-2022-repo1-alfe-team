import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, InfoIcon, RepeatIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Heading, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import { motion } from "framer-motion";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsInfo, BsInfoCircle, BsThreeDots, BsThreeDotsVertical } from "react-icons/bs"

const MemberCard = ({ member }: any) => {
    const [open, setOpen] = useState(false);
    const MotionStack = motion(Stack);
    return (
        <Box px={4} py={2}>
            <Stack p={4} shadow={"md"} rounded={'lg'}>
                <HStack justifyContent={'space-between'} alignItems={'start'}>
                    <HStack spacing={4}>
                        <Avatar name={"Marko Pekas"} size="md" />
                        <Stack spacing={0}>
                            <Heading size="md">{"Marko Pekas"}</Heading>
                            <Text color={"gray.400"}>{"Member"}</Text>
                        </Stack>
                    </HStack>
                    <Stack justifyContent={'end'}>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<BsThreeDotsVertical />}
                            variant='ghost'
                        />
                        <MenuList p={0} overflow={'hidden'}>
                            <MenuItem fontSize={'lg'} py={2} backgroundColor={'red.500'} _focus={{backgroundColor: 'red.500'}} _hover={{backgroundColor: 'red.600'}} textColor={"white"} fontWeight={'medium'} icon={<BiTrash size={24} />}>
                            Remove
                            </MenuItem>
                            <MenuItem fontSize={'lg'} py={2} _hover={{backgroundColor: 'gray.100'}} fontWeight={'medium'} icon={<BsInfoCircle size={24} />}>
                            Info
                            </MenuItem>
                        </MenuList>
                        </Menu>
                    </Stack>
                </HStack>
                <HStack justifyContent={'end'} alignItems={'end'}>
                    <Text fontSize={12} color={'gray.400'}>{"avg monthly spending"}</Text>
                    <Text fontSize={24} fontWeight={'medium'} lineHeight={1.2} color={'gray.800'}>{"153,26"}</Text>
                    <Text fontSize={12} color={'gray.400'}>{"HRK"}</Text>
                </HStack>
            </Stack>
        </Box>
    )
}

export default MemberCard