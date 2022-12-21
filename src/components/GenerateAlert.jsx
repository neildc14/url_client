import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const GenerateAlert = ({ status, description }) => {
  return (
    <Alert status={status} mt={4}>
      <AlertIcon />
      {description}
    </Alert>
  );
};

export default GenerateAlert;
