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
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Teams, TeamsAndUser, User } from "@prisma/client";
import { ApiReturn } from "./api/teams";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useState } from "react";
import MobileNav from "../components/MobileNav";

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
  const { isLoading: isLoadingSpending, data: spendingData } = useQuery(
    `spending-${teamSelect}`,

    () =>
      fetch(`/api/spending?teamId=${data[teamSelect || 0]?.id || ""}`).then(
        (res) => res.json()
      ),
    {
      enabled: !!data,
    }
  );
  // }
  // if (isLoading) return <p>Loading...</p>;
  // console.log("🌙🌙🌙", spendingData, isLoadingSpending);
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(e) => setTeamsSelect(e.snapIndex)}
        onSwiper={(swiper: any) => console.log(swiper)}
        pagination={{ clickable: true }}
        style={{ padding: "24px 0px" }}
      >
        {data?.map((el: ApiReturn) => {
          console.log(el);
          return (
            <SwiperSlide key={el.id} style={{ padding: "0px 10px" }}>
              <TeamsSelect el={el} />
            </SwiperSlide>
          );
        })}
      </Swiper>

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
      <Stack spacing="5" mt="5" paddingX={2}>
        {spendingData?.map((el, i) => {
          console.log("spendingData", el);
          return (
            <Transaction
              key={i}
              amount={el.amount}
              itemName={el.item.name}
              userId={el.userId}
              username={el.user.name}
              totalPrice={el.amount * el.item.price}
            />
          );
        })}
      </Stack>
      <MobileNav />
    </>
  );
};

export default Home;

// http://localhost:3000/api/teams/join?teamId=cl1ht5d2p032338e0n82jxrm1
