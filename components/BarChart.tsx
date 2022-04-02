import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from '@faker-js/faker';
import { Box, HStack, Stack, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    legend: {
      display: false,
    }
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: labels.map((e, i) => i===labels.length-1?'rgb(255, 150, 200)':'rgb(255, 99, 132)'),
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: labels.map((e, i) => i===labels.length-1?'rgb(120, 250, 250)':'rgb(75, 192, 192)'),
    },
    {
      label: 'Dataset 3',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: labels.map((e, i) => i===labels.length-1?'rgb(80, 200, 255)':'rgb(53, 162, 235)'),
    },
  ],
};

export function BarChart({setMth}: {setMth: (e: number) => void}) {
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    setMth(selected);
  }, [selected]);
  // return <Bar options={options} data={data} />;
  const darkHighlit = useColorModeValue('gray.100', 'gray.900');
  return (
    <HStack maxW={'md'} justifyContent={'space-around'} alignItems={'end'}>
      {['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((mth, i) => {
        console.log(Math.sin((i+0.52)*2.525)*100);
        return (
        <Stack h={'150px'} onClick={() => setSelected(i)} rounded="md" backgroundColor={selected===i?darkHighlit:''} w={12} justifyContent={'end'} p={2} alignItems={'center'} key={i}>
          <Box w={'full'} h={`${Math.abs(Math.sin((i+0.542)*2.525))*100}px`} rounded="md" bg={i===4?'green.600':'brand.500'}></Box>
          <Text fontWeight={'medium'}>{mth}</Text>
        </Stack>
        )
      } 
      )}
    </HStack>
  )
}
