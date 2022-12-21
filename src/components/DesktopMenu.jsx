import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NavLink from "./NavLink";
import { logoutUser } from "../utils/logout";
import { BiUserCircle, BiLogOutCircle } from "react-icons/bi";

const DesktopMenu = ({ userCredentials }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={IconButton}
            aria-label="dropdown menu"
            icon={<ChevronDownIcon />}
            variant="outline"
          ></MenuButton>
          <MenuList>
            <MenuItem>
              {userCredentials && (
                <>
                  <Icon as={BiUserCircle} boxSize={6} me={2} />
                  <Text display="inline" fontSize="md" letterSpacing="widest">
                    {userCredentials.username.toUpperCase()}
                  </Text>
                </>
              )}
            </MenuItem>
            <MenuItem>
              <Icon as={BiLogOutCircle} boxSize={6} me={2} />
              <NavLink
                px={0}
                textAlign="left"
                linkName="Logout"
                hoverStyles={{ bgColor: "none" }}
                linkFunction={logoutUser}
              />
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default DesktopMenu;
