import React, { useState, useRef } from "react";
import {
  AttachmentIcon,
  DeleteIcon,
  EditIcon,
  CopyIcon,
} from "@chakra-ui/icons";
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
import copyToClipBoard from "../utils/copyToClipBoard";
import ViewFullLinkModal from "./ViewFullLinkModal";

const ArchiveUrl = ({ _id, original_link, shorten_link }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editModal, setEditModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const linkRef = useRef(null);
  const shortened_link = `shrinkly.onrender.com/li/${shorten_link}`;

  const handleClick = () => {
    window.location.href = original_link;
  };

  const editModalFunction = () => {
    setEditModal(!editModal);
  };

  const viewFullLinkModalFunction = () => {
    setViewModal(!viewModal);
  };

  const copyURL = () => {
    const textToCopy = linkRef?.current.innerText;
    copyToClipBoard(textToCopy);
  };

  return (
    <>
      <Card mb={4} px={2} pt={2} pb={4}>
        <Flex flexDirection="row" alignItems="center" gap={2}>
          <Spacer />
          <IconButton
            icon={<CopyIcon />}
            aria-label="edit link"
            onClick={copyURL}
          />
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
        <HStack
          mb={2}
          as="span"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace=" nowrap"
        >
          <Flex flexDirection="row" alignItems="center" gap={2}>
            <AttachmentIcon align="center" />
            <Button
              ref={linkRef}
              variant="ghost"
              display="block"
              p="0"
              _hover={{ bgColor: "none", textDecoration: "underline" }}
              _active={{ color: "teal.300", textDecoration: "underline" }}
              onClick={handleClick}
            >
              {shortened_link}
            </Button>
          </Flex>
        </HStack>
        <HStack height={4} sx={{ overflow: "hidden", whiteSpace: " nowrap" }}>
          <Text
            overflow="hidden"
            color="gray.500"
            textOverflow="ellipsis"
            onClick={viewFullLinkModalFunction}
          >
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
      <ViewFullLinkModal
        URL={original_link}
        viewModal={viewModal}
        viewFullLinkModalFunction={viewFullLinkModalFunction}
        copyURL={copyToClipBoard}
      />
    </>
  );
};

export default ArchiveUrl;
