import React, { useContext } from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import NavLink from "./NavLink";
import { logoutUser } from "../utils/logout";
import { IoCreateOutline } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";

const Nav = ({ textAlign = "left", onClose }) => {
  const user = useContext(AuthContext);
  let userCredentials = JSON.parse(user);

  return (
    <>
      {user && (
        <HStack bgColor="teal" mb={8} px={2} py={2}>
          <Icon as={BiUserCircle} boxSize={8} />
          <Text px={2} fontSize="lg" letterSpacing="widest">
            {userCredentials.username.toUpperCase()}
          </Text>
        </HStack>
      )}
      <NavLink
        location="/create"
        textAlign={textAlign}
        linkName="  Create Short URL"
        linkFunction={onClose}
      >
        <Icon as={IoCreateOutline} boxSize={6} me={1} />
      </NavLink>
      {user && (
        <>
          <NavLink
            location="/archives"
            textAlign={textAlign}
            linkName="Archives"
            linkFunction={onClose}
          >
            <Icon as={HiOutlineArchiveBox} boxSize={6} me={1} />
          </NavLink>
          <NavLink
            textAlign={textAlign}
            linkFunction={logoutUser}
            linkName="Logout"
          >
            <Icon as={BiLogOutCircle} boxSize={6} me={2} />
          </NavLink>
        </>
      )}
      {!user && (
        <>
          <NavLink
            location="/login"
            textAlign={textAlign}
            linkName="Login"
            linkFunction={onClose}
          />
          <NavLink
            location="/signup"
            textAlign={textAlign}
            bgColor="teal"
            linkName="Sign up"
            linkFunction={onClose}
          />
        </>
      )}
    </>
  );
};

export default Nav;
