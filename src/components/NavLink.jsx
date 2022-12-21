import React from "react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const NavLink = ({
  location,
  textAlign,
  linkName,
  linkFunction,
  children,
  px = 2,
  bgColor = "none",
  hoverStyles = { textDecoration: "none", bgColor: "teal.700" },
}) => {
  return (
    <Link
      as={RouterLink}
      to={location && location}
      display="flex"
      alignItems="center"
      py={2}
      px={px}
      textAlign={textAlign}
      bgColor={bgColor}
      _hover={hoverStyles}
      onClick={linkFunction}
    >
      {children}
      {linkName}
    </Link>
  );
};

export default NavLink;
