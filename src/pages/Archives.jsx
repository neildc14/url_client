import React from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  Spacer,
  Text,
  Skeleton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import ArchiveUrl from "../components/ArchiveUrl";
import { getRequest } from "../services/makeHTTPRequest";

const Archives = () => {
  const url = "li/";
  const { data, isLoading, isFetching, error } = useQuery(
    ["shorten_link", url],
    getRequest,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container as="main" maxW="500px" mx="auto" px={0} mt={8}>
      <Heading
        as="h2"
        display="block"
        mb={8}
        p={4}
        fontSize="lg"
        letterSpacing="widest"
        fontWeight="semibold"
        bgColor="teal"
      >
        <HStack>
          <Box as="span">URL Archives</Box>
          <Spacer />
          <Box fontWeight="normal" fontSize="sm">
            Links:{data?.length}
          </Box>
        </HStack>
      </Heading>
      {error && <Text textAlign="center">Unable to fetch URL</Text>}
      <Box as="section">
        {isLoading && (
          <Center>
            <Spinner size="xl" align="center" />
          </Center>
        )}

        <Skeleton fadeDuration={1} isLoaded={!isLoading || !isFetching}>
          {data?.map(({ _id, original_link, shorten_link, shared }) => (
            <ArchiveUrl
              key={_id}
              original_link={original_link}
              shorten_link={shorten_link}
              shared={shared}
            />
          ))}
        </Skeleton>
      </Box>
    </Container>
  );
};

export default Archives;
