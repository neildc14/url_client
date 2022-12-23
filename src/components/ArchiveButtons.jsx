import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";

const ArchiveButtons = ({
  copyURL,
  editModalFunction,
  deleteModalFunction,
}) => {
  return (
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
        onClick={deleteModalFunction}
      />
    </Flex>
  );
};

export default ArchiveButtons;
