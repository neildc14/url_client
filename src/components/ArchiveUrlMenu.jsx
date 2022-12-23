import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  HStack,
  Text,
} from "@chakra-ui/react";
import { BiDotsVerticalRounded, BiUser } from "react-icons/bi";
import { MdPublic } from "react-icons/md";
import { CopyIcon } from "@chakra-ui/icons";

const ArchiveUrlMenu = ({
  copyURL,
  shared,
  linkAccessToOnlyMe,
  linkAccessToAnyone,
}) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiDotsVerticalRounded />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<CopyIcon />} onClick={copyURL}>
          Copy URL
        </MenuItem>
        <MenuDivider />
        <MenuOptionGroup
          title="Who can access this link?"
          defaultValue={shared === false ? "false" : "true"}
          type="radio"
        >
          <MenuItemOption value="false" onClick={linkAccessToOnlyMe}>
            <HStack>
              <BiUser />
              <Text> Only me</Text>
            </HStack>
          </MenuItemOption>
          <MenuItemOption value="true" onClick={linkAccessToAnyone}>
            <HStack>
              <MdPublic />
              <Text> Anyone</Text>
            </HStack>
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default ArchiveUrlMenu;
