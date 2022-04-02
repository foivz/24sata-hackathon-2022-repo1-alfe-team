import { TeamsSelect } from "../components/TeamsSelect";
import { Transaction } from "../components/Transaction";
import {
  Avatar,
  AvatarGroup,
  Box,
  Heading,
  HStack,
  Stack,
  useColorModeValue,
  VStack,
  Text,
  Link,
  chakra,
  Container,
  Skeleton,
  SkeletonCircle,
  useMediaQuery,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Teams, TeamsAndUser, User } from "@prisma/client";
import { ApiReturn } from "./api/teams";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useState } from "react";
import Nav from "../components/Nav";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import AddTeamCard from "../components/AddTeamCard";
import MobileNav from "../components/MobileNav";
import { Pagination } from "swiper";
import NavBar from "../components/Navbar";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("teams", () =>
    fetch("/api/teams").then((res) => res.json())
  );

  const [teamSelect, setTeamsSelect] = useState(0);
  if (data) console.log("🔥", data[teamSelect || 0]);
  // const teamId = data[teamSelect || 0]?.id || "";
  // console.log("teamId", teamId, teamSelect);
  // var spendingData = null;
  // if (data) {

  // console.log("🔥", data);
  // if (isLoading) return <p>Loading...</p>;
  const MotionBox = motion(Box);
  const MotionStack = motion(Stack);

  const {
    isLoading: isLoadingSpending,
    error: spendingError,
    data: spendingData,
  } = useQuery(
    `spending-${teamSelect}`,

    () =>
      fetch(`/api/spending?teamId=${data[teamSelect || 0]?.id || ""}`).then(
        (res) => res.json()
      ),
    {
      enabled: !!data,
    }
  );
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  // }
  // if (isLoading) return <p>Loading...</p>;
  // console.log("🌙🌙🌙", spendingData, isLoadingSpending);
  // isLoadingSpending = true;
  return (
    <>
      {isLargerThan800 ? <NavBar /> : null}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(e) => setTeamsSelect((e as any).snapIndex)}
        onSwiper={(swiper: any) => console.log(swiper)}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        style={{ padding: "24px 0px" }}
      >
        {isLoading ? (
          <SwiperSlide>
            <Container maxW={"container.sm"}>
              <Skeleton
                minH={{
                  base: "52",
                  md: "64",
                }}
                w="full"
                rounded="lg"
              />
            </Container>
          </SwiperSlide>
        ) : (
          data?.length > 0 &&
          data.map((el: ApiReturn) => {
            console.log(el);
            return (
              <SwiperSlide style={{ padding: "0px 10px" }} key={el.id}>
                <Container maxW={"container.sm"}>
                  <TeamsSelect el={el} key={el.id} />
                </Container>
              </SwiperSlide>
            );
          })
        )}
        <SwiperSlide style={{ padding: "0px 10px" }}>
          <Container maxW={"container.sm"}>
            <AddTeamCard />
          </Container>
        </SwiperSlide>
      </Swiper>
      {/* </Container> */}
      <Container maxW="container.xl">
        <HStack justifyContent="space-between" alignItems="center" paddingX={4}>
          <Heading size="md" my="auto">
            Transactions
          </Heading>
          <Link>
            <Text size="sm" color="gray.400">
              see more
            </Text>
          </Link>
        </HStack>
        {teamSelect !== data?.length ? (
          <TransactionsDisplay
            isLoadingSpending={isLoadingSpending}
            // el={el}
            spendingData={spendingData}
            // i={i}
          />
        ) : null}
      </Container>
      {isLargerThan800 ? null : <MobileNav />}
    </>
  );
};

export default Home;

// http://localhost:3000/api/teams/join?teamId=cl1ht5d2p032338e0n82jxrm1

export function TransactionsDisplay({ isLoadingSpending, spendingData }: { isLoadingSpending: any, spendingData: any }) {
  return (
    <Stack spacing="5" mt="5" paddingX={2}>
      {isLoadingSpending &&
        [1, 2, 3, 4].map((el) => {
          return (
            <>
              <HStack justifyContent="space-between" paddingX={2}>
                <HStack alignItems={"center"} height={"min-content"}>
                  <SkeletonCircle size="12" />
                  <Stack spacing={2}>
                    <Skeleton w="32" h="5" />
                    <Skeleton w="32" h="3" />
                  </Stack>
                </HStack>
                <Stack textAlign="right" spacing={1}>
                  <Skeleton w="24" h="4" />
                  <Text fontWeight="normal" fontSize="sm" color="gray.400">
                    <Skeleton w="24" h="4" />
                  </Text>
                </Stack>
              </HStack>
            </>
          );
        })}

      {spendingData &&
        spendingData.map((el: any, i: number) => {
          console.log("spendingData", el);
          return (
            <Transaction
              key={i}
              index={i}
              amount={el.amount}
              itemName={el.item.name}
              userId={el.userId}
              username={el.user.name}
              totalPrice={el.amount * el.price}
              userImage="/" // {el.user.image}
            />
          );
        })}
    </Stack>
  );
}
