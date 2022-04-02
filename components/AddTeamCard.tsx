import {
    Box,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
const AddTeamCard: NextPage = () => {
    const { isLoading, error, data } = useQuery("teams", () =>
    fetch("/api/teams").then((res) => res.json())
    );
    const [teamSelect, setTeamsSelect] = useState(0);
    console.log("🔥", data);
    // if (isLoading) return <p>Loading...</p>;
    const MotionBox = motion(Box)
    const MotionStack = motion(Stack)


    return (
    <MotionStack
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}

        w={"full"} //
        rounded="lg" //
        border={'1px'}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderStyle={'dashed'}
        padding="7"
        minH={{
        base: "52",
        md: "64",
        }}
        justifyContent="center"
        alignItems="center"
    >
        <Box  color={useColorModeValue("gray.200", "gray.700")} >
        <BiPlus style={{strokeWidth: 0.1}} size={64} />
        </Box>
    </MotionStack>
    );
};

export default AddTeamCard;

// http://localhost:3000/api/teams/join?teamId=cl1hspg2y008238e06xhbuwgo
