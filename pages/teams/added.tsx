import {
  Button,
  Container,
  HStack,
  Text,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { FiShare } from "react-icons/fi";
import { toast } from "react-toastify";
import { AddNavbar } from "./add";

export const isServer = typeof window === "undefined";

interface AddedProps {}

function randomInRange(min: any, max: any) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
} as any;

function getAnimationSettings(originXA: any, originXB: any) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

const Added = ({}: AddedProps) => {
  const notify = () => toast("Link kopiran");

  const router = useRouter();
  console.log("router.query.id", router.query);
  const id = window.location.href.split("?")[1].split("=")[1];
  const us = useClipboard(
    `${isServer ? "" : window.location.origin}/teams/join?id=${id}`
  );

  const style = {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: -1,
  } as any;

  const refAnimationInstance = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<any>(0);
  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Container maxW="container.sm" minH="90vh">
      <AddNavbar title="Team added" />
      <ReactCanvasConfetti
        // set the styles as for a usual react component
        style={canvasStyles}
        // set the class name as for a usual react component
        className={"yourClassName"}
        // set the callback for getting instance. The callback will be called after initialization ReactCanvasConfetti component
        refConfetti={getInstance}
      />
      <VStack spacing={4} align={"start"} mt={4}>
        <Text fontWeight={"medium"} fontSize="md">
          Bez brige, uvijek možete dodati nove članove.
        </Text>

        <HStack w="full">
          <Button
            w="full"
            onClick={() => {
              us.onCopy();
              notify();
            }}
          >
            <Text fontWeight={"medium"} fontSize="md">
              Kopiraj link
            </Text>
          </Button>
          <Button
            w="full"
            leftIcon={<FiShare />}
            onClick={() => {
              navigator.share({
                url: us.value,
              });
            }}
          >
            <Text fontWeight={"medium"} fontSize="md">
              Podijeli
            </Text>
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};
export default Added;
