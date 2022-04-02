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
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useState } from "react";

import MobileNav from "../components/MobileNav";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("teams", () =>
    fetch("/api/teams").then((res) => res.json())
  );
  const [teamSelect, setTeamsSelect] = useState(0);
  console.log("🔥", data);
  // if (isLoading) return <p>Loading...</p>;

  return (
    <>
      
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper: any) => console.log(swiper)}
        pagination={{ clickable: true }}
        style={{ padding: '24px 0px'}}
      >
        {data?.map((el: ApiReturn) => {
        console.log(el);
        return (
          <SwiperSlide style={{padding: '0px 10px'}}>
            <TeamsSelect el={el} key={el.id} />
          </SwiperSlide>
        );
      })}
        <SwiperSlide style={{padding: '0px 10px'}}>
          <AddTeamCard />
        </SwiperSlide>
      </Swiper>

      <HStack justifyContent="space-between" alignItems="center" paddingX={4}>
        <Heading size="md" my="auto">
          Transactions
        </Heading>
        <Link>
          <Text size="sm" color="gray.400">see more</Text>
        </Link>
      </HStack>
      <Stack spacing="5" mt="5" paddingX={2}>
        {[1, 2, 3, 4, 5].map((i) => {
          return <Transaction key={i} id={i} />;
        })}
      </Stack>
      <MobileNav />
    </>
  );
};

export default Home;

// http://localhost:3000/api/teams/join?teamId=cl1hspg2y008238e06xhbuwgo
