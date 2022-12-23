import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import useInput from "../hooks/useInput";
import { patchRequest } from "../services/makeHTTPRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditModal = ({ shorten_link, URL, editModal, editModalFunction }) => {
  const [URLValue, URLBind] = useInput(URL);
  const [shortenLinkValue, shortenLinkBind] = useInput(shorten_link);
  const [error, setError] = useState(null);
  const toast = useToast();

  const queryClient = useQueryClient();

  const editURL = useMutation({
    mutationFn: patchRequest,
    onSettled: () => {
      queryClient.invalidateQueries(["shorten_link"]);
    },
    onSuccess: () => {
      toast({
        title: "URL updated.",
        description: "Your URL is successfully updated.",
        status: "success",
        duration: 700,
        isClosable: true,
      });
    },
  });

  const editURLFunction = (e) => {
    e.preventDefault();

    try {
      if (shortenLinkValue === "")
        throw new Error("Please input shortened URL");
      editURL.mutate({
        previous_shorten_link: `li/${shorten_link}`,
        body: { original_link: URLValue, shorten_link: shortenLinkValue },
      });

      editModalFunction();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal
      blockScrollOnMount={false}
      onClose={editModalFunction}
      isOpen={editModal}
      isCentered
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="md">Edit URL</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={editURLFunction}>
            <FormControl mb={4}>
              <FormLabel>Original URL</FormLabel>
              <Input {...URLBind} />
            </FormControl>
            <FormControl isInvalid={error}>
              <FormLabel>Shorten URL</FormLabel>
              <Input {...shortenLinkBind} />
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <Button type="submit" mt={8} mb={4} size="sm" ms="auto">
              Save edited URL
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
