import React from "react";
import { Box, Container } from "@chakra-ui/react";
import InputLink from "../components/InputLink";
import ShortenedLink from "../components/ShortenedLink";
import useInput from "../hooks/useInput";
import { postRequest } from "../services/makeHTTPRequest";
import { useMutation } from "@tanstack/react-query";
import GenerateAlert from "../components/GenerateAlert";

const ShortLink = () => {
  const [linkValue, linkBind] = useInput("");

  const createURL = useMutation({
    mutationFn: postRequest,
  });

  const createShortURL = (e) => {
    e.preventDefault();
    createURL.mutate({ url: "li", body: { original_link: linkValue } });
  };

  const createdShortURL = createURL.data?.data.shorten_link;
  const isLoading = createURL.isLoading;
  const postError = createURL.error?.response.data.error;

  return (
    <Container maxW="5xl">
      <Box pt={{ base: "40%", md: "20%", lg: "10%" }} maxW="500px" mx="auto">
        <InputLink
          linkValue={linkValue}
          linkBind={linkBind}
          createShortURL={createShortURL}
        />
        {postError && linkValue !== "" && (
          <GenerateAlert status="error" description={postError} />
        )}
        <ShortenedLink
          createdShortURL={createdShortURL}
          isLoading={isLoading}
        />
      </Box>
    </Container>
  );
};

export default ShortLink;
