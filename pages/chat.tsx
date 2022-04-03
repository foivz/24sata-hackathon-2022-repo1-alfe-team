import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Container,
  Box,
  Text,
  Button,
  Stack,
  ChakraProvider,
  chakra,
  Heading,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState } from "react";
import MobileNav from "../components/MobileNav";

const Chat = () => {
  const input = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <Container maxW="container.lg" mt="10">
      <VStack spacing="5">
        <Heading>Pitaj Sveznajućeg Alfu</Heading>
        <FormControl>
          <Input id="email" type="email" ref={input} />
          <FormHelperText>
            npr. Koja je razlika između poreza i prireza?
          </FormHelperText>
        </FormControl>
        <Button
          w="full"
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const {
              data: { res },
            } = await axios.get("/api/openai", {
              params: {
                type: "chat",
                chat: (input as any)?.current?.value,
              },
            });
            setResponse(res);
            setIsLoading(false);
          }}
        >
          Pitaj Alfu
        </Button>

        {/* <Box> */}
        <Text>
          <chakra.span fontWeight={"bold"}>Odgovor alfe:</chakra.span>
          {response}
        </Text>
        {/* </Box> */}
      </VStack>
      <MobileNav location="chat" />
    </Container>
  );
};

export default Chat;
