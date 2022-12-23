import React from "react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack } from "@chakra-ui/react";

const ArchiveShortenedURL = ({ shortened_link, navigateToExternalLink }) => {
  return (
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
          variant="ghost"
          display="block"
          p="0"
          _hover={{ bgColor: "none", textDecoration: "underline" }}
          _active={{ color: "teal.300", textDecoration: "underline" }}
          onClick={navigateToExternalLink}
        >
          {shortened_link}
        </Button>
      </Flex>
    </HStack>
  );
};

export default ArchiveShortenedURL;
