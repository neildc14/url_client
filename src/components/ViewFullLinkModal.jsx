import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ViewFullLinkModal = ({
  URL,
  copyURL,
  viewModal,
  viewFullLinkModalFunction,
}) => {
  const buttonCopy = () => {
    copyURL(URL);
    viewFullLinkModalFunction();
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={viewModal}
      onClose={viewFullLinkModalFunction}
      isCentered
      size="xs"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody mt={8}>
          <Text>{URL}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={buttonCopy} size="sm">
            Copy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewFullLinkModal;
