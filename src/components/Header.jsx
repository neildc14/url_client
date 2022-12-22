import React, { useContext } from "react";
import { Box, HStack, Link, Progress, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Customization from "../theme/Customization";
import MobileNav from "./MobileNav";
import { useMediaQuery } from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import ProgressContext from "../context/ProgressContext";

const Header = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const { progress } = useContext(ProgressContext);

  return (
    <>
      <Box py={8}>
        <HStack>
          <Box>
            <Link as={RouterLink} to="/" fontSize="2xl" fontWeight="semibold">
              Shrinky
            </Link>
          </Box>
          <Spacer />
          <Customization />
          {isLargerThan800 ? <DesktopNav /> : <MobileNav />}
        </HStack>
      </Box>
      {progress && <Progress height=".1rem" isIndeterminate />}
      <hr />
    </>
  );
};

export default Header;
