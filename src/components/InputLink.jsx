import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";

const InputLink = ({ linkValue, linkBind, createShortURL }) => {
  const { colorMode } = useColorMode();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Box as="form" onSubmit={createShortURL}>
      <FormControl mb={6}>
        <Center>
          <FormLabel fontSize="lg" fontWeight="thin">
            Input link to be shortened
          </FormLabel>
        </Center>
        <Input type="text" autoComplete="off" ref={inputRef} {...linkBind} />
      </FormControl>
      <FormControl>
        <Button
          type="submit"
          disabled={linkValue === "" ? true : false}
          w="100%"
          bgColor={colorMode === "light" && "blue.500"}
          color={colorMode === "light" && "white"}
          _hover={{ bgColor: `${colorMode === "light" && "blue.600"}` }}
        >
          Generate shortened link
        </Button>
      </FormControl>
    </Box>
  );
};

export default InputLink;
