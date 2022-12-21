import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useInput from "../hooks/useInput";
import { patchRequest } from "../services/makeHTTPRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditModal = ({ shorten_link, URL, editModal, editModalFunction }) => {
  const [URLValue, URLBind] = useInput(URL);
  const [shortenLinkValue, shortenLinkBind] = useInput(shorten_link);
  const queryClient = useQueryClient();

  const editURL = useMutation({
    mutationFn: patchRequest,
    onSettled: () => {
      queryClient.invalidateQueries(["shorten_link"]);
    },
  });

  const editURLFunction = (e) => {
    e.preventDefault();
    editURL.mutate({
      previous_shorten_link: `li/${shorten_link}`,
      body: { original_link: URLValue, shorten_link: shortenLinkValue },
    });
    editModalFunction();
  };

  return (
    <Modal
      blockScrollOnMount={false}
      onClose={editModalFunction}
      isOpen={editModal}
      isCentered
      size="sm"
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
            <FormControl mb={4}>
              <FormLabel>Shorten URL</FormLabel>
              <Input {...shortenLinkBind} />
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
