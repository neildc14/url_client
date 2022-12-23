import {  DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";
import ArchiveUrlMenu from "./ArchiveUrlMenu";

const ArchiveButtons = ({
  copyURL,
  editModalFunction,
  deleteModalFunction,
  linkAccessToOnlyMe,
  linkAccessToAnyone,
  shared,
}) => {
  return (
    <Flex flexDirection="row" alignItems="center" gap={2}>
      <Spacer />
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
      <ArchiveUrlMenu
        copyURL={copyURL}
        linkAccessToOnlyMe={linkAccessToOnlyMe}
        linkAccessToAnyone={linkAccessToAnyone}
        shared={shared}
      />
    </Flex>
  );
};

export default ArchiveButtons;
