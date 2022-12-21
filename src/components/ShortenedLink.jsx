import React, { useRef, useState } from "react";
import {
  Link,
  Box,
  Button,
  HStack,
  Center,
  Spacer,
  useColorMode,
  Spinner,
  Text,
} from "@chakra-ui/react";

const ShortenedLink = ({ createdShortURL, isLoading }) => {
  const { colorMode } = useColorMode();
  const linkRef = useRef(null);
  const [copy, setCopy] = useState("Copy");

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(linkRef.current?.innerText);
    setCopy("Copied ✓");
  };

  const navigateToExternalLink = () => {
    window.location.href =
      "https://shrinkly.onrender.com/li/" + createdShortURL;
  };

  return (
    <Box w="100%" mt={14}>
      <Center fontSize="lg" mb={4}>
        <HStack>
          <Text> Result:</Text> {isLoading && <Spinner />}
        </HStack>
      </Center>

      <HStack
        w="100%"
        ps={2}
        sx={{
          borderBottom: `.01rem solid ${
            colorMode === "dark" ? "white" : "gray"
          }`,
        }}
      >
        <Link as="button" ref={linkRef} onClick={navigateToExternalLink}>
          {createdShortURL &&
            "https://shrinkly.onrender.com/li/" + createdShortURL}
        </Link>
        <Spacer />
        <Button
          borderRadius="0"
          display="inline-block"
          onClick={copyToClipBoard}
        >
          {copy}
        </Button>
      </HStack>
    </Box>
  );
};

export default ShortenedLink;
