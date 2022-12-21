import React from "react";
import { Box, HStack, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Customization from "../theme/Customization";
import MobileNav from "./MobileNav";
import { useMediaQuery } from "@chakra-ui/react";
import Nav from "./Nav";
import AccordionNav from "./AccordionNav";
import DesktopMenu from "./DesktopMenu";
import DesktopNav from "./DesktopNav";

const Header = () => {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
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
          {isLargerThan800 ? <DesktopNav/> : <MobileNav />}
        </HStack>
      </Box>
      <hr />
    </>
  );
};

export default Header;
