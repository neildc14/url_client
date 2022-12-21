import React, { useContext } from "react";
import NavLink from "./NavLink";
import AuthContext from "../context/AuthContext";
import DesktopMenu from "./DesktopMenu";
import { IoCreateOutline } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { HStack, Icon } from "@chakra-ui/react";

const DesktopNav = () => {
  const user = useContext(AuthContext);
  let userCredentials = JSON.parse(user);

  return (
    <>
      <HStack>
        <NavLink location="/create" px={2} linkName="  Create Short URL">
          <Icon as={IoCreateOutline} boxSize={6} me={1} />
        </NavLink>
      </HStack>
      {user && (
        <NavLink location="/archives" px={2} linkName="Archives">
          <Icon as={HiOutlineArchiveBox} boxSize={6} me={1} />
        </NavLink>
      )}
      {!user ? (
        <>
          <NavLink location="/login" px={6} linkName="Login" />
          <NavLink
            location="/signup"
            px={6}
            bgColor="teal"
            linkName="Sign up"
          />
        </>
      ) : (
        <DesktopMenu userCredentials={userCredentials} />
      )}
    </>
  );
};

export default DesktopNav;
