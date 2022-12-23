import { HStack, Text } from "@chakra-ui/react";
import React from "react";

const ArchiveOrginalURL = ({ viewFullLinkModalFunction, original_link }) => {
  return (
    <HStack height={4} sx={{ overflow: "hidden", whiteSpace: " nowrap" }}>
      <Text
        overflow="hidden"
        color="gray.500"
        textOverflow="ellipsis"
        cursor="pointer"
        onClick={viewFullLinkModalFunction}
      >
        {original_link}
      </Text>
    </HStack>
  );
};

export default ArchiveOrginalURL;
