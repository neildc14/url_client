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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "../services/makeHTTPRequest";

export default function DeleteModal({
  deleteModal,
  deleteModalFunction,
  shorten_link,
  URL,
}) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteURL = useMutation({
    mutationFn: deleteRequest,
    onSettled: () => {
      queryClient.invalidateQueries(["shorten_link"]);
    },
    onSuccess: () => {
      toast({
        title: "URL deleted.",
        description: "Your URL is successfully deleted.",
        status: "success",
        duration: 700,
        isClosable: true,
      });
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
        onClose={deleteModalFunction}
        isOpen={deleteModal}
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
