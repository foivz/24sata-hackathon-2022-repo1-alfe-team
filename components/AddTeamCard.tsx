import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useQuery } from "react-query";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const AddTeamCard: NextPage = () => {
	const { isLoading, error, data } = useQuery("teams", () => {
		console.log("fetching teams");

		return fetch("/api/teams").then((res) => res.json());
	});
	const router = useRouter();
	const [teamSelect, setTeamsSelect] = useState(0);
	// if (isLoading) return <p>Loading...</p>;
	const MotionBox = motion(Box);
	const MotionStack = motion(Stack);

	return (
		<MotionStack
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.9 }}
			w={"full"} //
			rounded="lg" //
			border={"3px"}
			borderColor={useColorModeValue("gray.200", "gray.700")}
			borderStyle={"dashed"}
			onClick={() => router.push(`/teams/add`)}
			padding="7"
			minH={{
				base: "52",
				md: "64",
			}}
			justifyContent="center"
			alignItems="center"
			bg={useColorModeValue("gray.50", "gray.700")}
		>
			<Box
				color={useColorModeValue("gray.200", "gray.700")}
				onClick={() => router.push(`/teams/add`)}
			>
				<BiPlus style={{ strokeWidth: 0.1 }} size={64} />
			</Box>
		</MotionStack>
	);
};

export default AddTeamCard;

// http://localhost:3000/api/teams/join?teamId=cl1hspg2y008238e06xhbuwgo
