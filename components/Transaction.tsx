import { HStack, Avatar, Stack, Heading, chakra, Text } from "@chakra-ui/react";
import React from "react";
export function Transaction(props: any) {
  return (
    <HStack justifyContent="space-between" paddingX={2}>
      <HStack alignItems={'center'} height={'min-content'}>
        <Avatar src={`https://avatars.dicebear.com/api/micah/${props.id}.svg`} backgroundColor={'white'} style={{border: '1px solid #CCC'}} size="md" marginRight={2}></Avatar>
        <Stack spacing={0}>
          <Heading size="sm" fontWeight={'medium'}>Mlijeko</Heading>
          <Text>Luka Počinok</Text>
        </Stack>
      </HStack>
      <Stack textAlign="right" spacing={-1}>
        <Text fontWeight="medium" fontSize="lg">
          8.75{" "}
          <chakra.span fontWeight="normal" fontSize="xs" color={'gray.400'}>
            HRK
          </chakra.span>
        </Text>
        <Text fontWeight="normal" fontSize="sm" color="gray.400">
          May 26, 2022
        </Text>
      </Stack>
    </HStack>
  );
}
