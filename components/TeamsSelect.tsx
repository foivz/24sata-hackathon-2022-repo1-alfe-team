import {
	Avatar,
	AvatarGroup,
	Box,
	Center,
	Heading,
	HStack,
	IconButton,
	Stack,
	Text,
} from "@chakra-ui/react";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import { TeamsAndUser, User } from "@prisma/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { FiPlus } from "react-icons/fi";
import { ApiReturn } from "../pages/api/teams/index";
export function TeamsSelect({ el }: { el: ApiReturn }) {
	const allTeamMembers = [el.owner, ...el.TeamsAndUser];
	const MotionStack = motion(Stack);
	const router = useRouter();

	const [hover, setHover] = React.useState(false);

	return (
		<>
			<Center
				onClick={() => {
					if (!hover) {
						router.push(`/team/${el.id}`);
					}
				}}
			>
				<MotionStack
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					maxW="container.sm"
					key={el.id}
					w={"full"} //
					bgColor={useColorModeValue("gray.50", "gray.700")}
					rounded="lg" //
					shadow={useColorModeValue("lg", "sm")}
					_hover={{
						opacity: 0.95,
						shadow: "md",
					}}
					padding="7"
					minH={{
						base: "52",
						md: "64",
					}}
					justifyContent="space-between"
				>
					<HStack justify={"space-between"}>
						<Heading size="lg">{el.name}</Heading>
						<IconButton
							m={4}
							onPointerEnter={() => setHover(true)}
							onPointerLeave={() => setHover(false)}
							onMouseEnter={() => setHover(true)}
							colorScheme="brand"
							onMouseLeave={() => setHover(false)}
							_hover={{
								background: "brand.400",
							}}
							textColor={useColorModeValue("gray.500", "gray.700")}
							icon={<FiPlus fill="current" />}
							aria-label="add"
							rounded={"full"}
							bg={"brand.500"}
							onClick={() => {
								router.push(`/transaction/add?teamId=${el.id}`);
							}}
						/>
					</HStack>
					<HStack justifyContent="space-between" alignItems="center">
						<GG allTeamMembers={allTeamMembers} />
						<Box>
							<Text>Spending</Text>
							<Heading>
								{el.spending.toFixed(2)}
								<chakra.span fontSize="sm" fontWeight="normal">
									{" "}
									HRK
								</chakra.span>
							</Heading>
						</Box>
					</HStack>
				</MotionStack>
			</Center>
		</>
	);
}

interface GGProps {
	allTeamMembers: (
		| User
		| (TeamsAndUser & {
				user: User;
		  })
	)[];
}

export const GG = ({ allTeamMembers }: GGProps) => {
	return (
		<AvatarGroup>
			{allTeamMembers?.map((elq, i) => (
				<Avatar
					key={elq.id}
					size="md"
					src={(elq as any)?.user?.image || (elq as any)?.image}
				/>
			))}
		</AvatarGroup>
	);
};
