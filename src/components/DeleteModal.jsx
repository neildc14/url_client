import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "../services/makeHTTPRequest";

export default function DeleteModal({ onClose, isOpen, shorten_link, URL }) {
  const queryClient = useQueryClient();

  const deleteURL = useMutation({
    mutationFn: deleteRequest,
    onSettled: () => {
      queryClient.invalidateQueries(["shorten_link"]);
    },
  });

  const deleteShortenURLFunction = (e) => {
    e.preventDefault();
    deleteURL.mutate(`li/${shorten_link}`);
  };

  return (
    <div style={{ overflow: "auto" }}>
      <Modal
        blockScrollOnMount={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="xs"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">{URL}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box as="form">
              <Text>Are you sure that you want to delete this URL?</Text>
              <Button
                type="submit"
                mt={8}
                mb={4}
                size="sm"
                ms="auto"
                onClick={deleteShortenURLFunction}
              >
                Delete URL
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
