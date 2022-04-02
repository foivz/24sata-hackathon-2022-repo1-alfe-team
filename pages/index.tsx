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
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Teams, TeamsAndUser, User } from "@prisma/client";
import { ApiReturn } from "./api/teams";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("/api/teams").then((res) => res.json())
  );
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
      </Swiper>

      <HStack justifyContent="space-between" alignItems="center" paddingX={2}>
        <Heading size="md" my="auto">
          Transactions
        </Heading>
        <Link>
          <Text size="sm" color="gray.400">see more</Text>
        </Link>
      </HStack>
      <Stack spacing="5" mt="5">
        {[1, 2, 3, 4, 5].map((i) => {
          return <Transaction key={i} id={i} />;
        })}
      </Stack>
    </>
  );
};

export default Home;
