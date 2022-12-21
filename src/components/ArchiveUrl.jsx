import React, { useState } from "react";
import { AttachmentIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Spacer,
  IconButton,
  Card,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";

const ArchiveUrl = ({ _id, original_link, shorten_link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editModal, setEditModal] = useState(false);
  const shortened_link = `https://shrinkly.onrender.com/li/${shorten_link}`;

  const handleClick = () => {
    window.location.href = original_link;
    console.log(original_link);
  };

  const editModalFunction = () => {
    setEditModal(!editModal);
  };

  return (
    <>
      <Card mb={4} p={2}>
        <HStack mb={6}>
          <Flex flexDirection="row" alignItems="center" gap={2}>
            <AttachmentIcon align="center" />
            <Button
              onClick={handleClick}
              variant="ghost"
              display="inline-block"
              p="0"
              _hover={{ bgColor: "none", textDecoration: "underline" }}
              _active={{ color: "teal.300", textDecoration: "underline" }}
            >
              {shortened_link}
            </Button>
          </Flex>
          <Spacer />
          <Flex flexDirection="row" alignItems="center" gap={2}>
            <IconButton
              icon={<EditIcon />}
              aria-label="edit link"
              onClick={editModalFunction}
            />
            <IconButton
              icon={<DeleteIcon />}
              aria-label="delete link"
              onClick={onOpen}
            />
          </Flex>
        </HStack>
        <HStack height={20} overflow="hidden">
          <Text overflow="hidden" color="gray.500">
            {original_link}
          </Text>
        </HStack>
      </Card>

      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={_id}
        shorten_link={shorten_link}
        URL={shortened_link}
      />
      <EditModal
        shorten_link={shorten_link}
        URL={original_link}
        editModal={editModal}
        editModalFunction={editModalFunction}
      />
    </>
  );
};

export default ArchiveUrl;
