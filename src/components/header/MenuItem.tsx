import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from "@nextui-org/react";
import { ChevronDown } from "../../../public/icon";

import clsx from "clsx";

interface MenuItemType {
  name: string;
  path?: string;
  subItems?: { name: string; path: string }[];
}

interface MenuItemProps {
  menuItem: MenuItemType;
  pathName: string;
  isLoading: boolean;
  categories: string[];
}

const MenuItem = ({ menuItem, pathName, isLoading }: MenuItemProps) => {
  if (menuItem.name === "Categories") {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            disableRipple
            className={clsx(
              "bg-transparent p-0 text-medium font-semibold text-black data-[hover=true]:bg-transparent",
              (pathName === menuItem.path ||
                (menuItem.subItems &&
                  menuItem.subItems.some(
                    (subItem) => pathName === subItem.path,
                  ))) &&
                "font-thin",
            )}
            endContent={
              <ChevronDown width={10} height={10} size={10} fill={"#000"} />
            }
            radius="sm"
            variant="light"
          >
            {menuItem.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu className="w-[340px]" itemClasses={{ base: "gap-4" }}>
          {(menuItem.subItems &&
            menuItem.subItems.map((subItem, index) => (
              <DropdownItem key={index}>
                <Link
                  className={clsx(
                    "w-full font-semibold text-black",
                    pathName === subItem.path && "font-thin",
                  )}
                  href={subItem.path}
                  aria-current="page"
                >
                  {subItem.name}
                </Link>
              </DropdownItem>
            ))) || <div>{isLoading}</div>}
        </DropdownMenu>
      </Dropdown>
    );
  }
  return (
    <Link
      href={menuItem.path}
      aria-current="page"
      className={clsx(
        "font-semibold text-black",
        pathName === menuItem.path && "font-thin",
      )}
    >
      {menuItem.name}
    </Link>
  );
};

export default MenuItem;
