import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Customization = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        aria-label="color theme"
        variant="ghost"
        icon={
          colorMode === "light" ? (
            <MoonIcon boxSize={6} color="gray.400" />
          ) : (
            <SunIcon boxSize={6} color="gray.400" />
          )
        }
        onClick={toggleColorMode}
      />
    </>
  );
};

export default Customization;
