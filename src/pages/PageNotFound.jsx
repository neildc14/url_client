import { Box, Center, Text, Heading } from "@chakra-ui/react";
import React from "react";

const PageNotFound = () => {
  return (
    <Box display="grid" placeItems="center">
      <Heading mt={16}>404</Heading>
      <Text fontSize="2xl">Page Not Found</Text>
    </Box>
  );
};

export default PageNotFound;
