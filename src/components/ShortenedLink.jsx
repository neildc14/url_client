import React, { useRef, useState } from "react";
import {
  Link,
  Box,
  Button,
  HStack,
  VStack,
  Center,
  Spacer,
  useColorMode,
  Spinner,
  Text,
} from "@chakra-ui/react";
import copyToClipBoard from "../utils/copyToClipBoard";

const ShortenedLink = ({ createdShortURL, isLoading }) => {
  const { colorMode } = useColorMode();
  const linkRef = useRef(null);
  const [copy, setCopy] = useState("Copy");

  const copyURL = () => {
    const textToCopy = linkRef.current?.innerText;
    copyToClipBoard(textToCopy);
    setCopy("Copied ✓");
  };

  const navigateToExternalLink = () => {
    window.location.href = "https://shrinky.onrender.com/li/" + createdShortURL;
  };

  return (
    <Box w="100%" mt={14}>
      <Center fontSize="lg" mb={4}>
        <HStack>
          <Text> Result:</Text> {isLoading && <Spinner />}
        </HStack>
      </Center>

      <VStack w="100%" ps={2} direction="column">
        <Link
          as="button"
          mt={8}
          w="100%"
          sx={{
            borderBottom: `.01rem solid ${
              colorMode === "dark" ? "white" : "gray"
            }`,
          }}
          ref={linkRef}
          onClick={navigateToExternalLink}
        >
          {createdShortURL && "shrinky.onrender.com/li/" + createdShortURL}
        </Link>
        <Spacer />
        <Button
          w="100%"
          borderRadius="0"
          display="inline-block"
          onClick={copyURL}
        >
          {copy}
        </Button>
      </VStack>
    </Box>
  );
};

export default ShortenedLink;
