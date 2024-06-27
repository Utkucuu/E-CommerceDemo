"use client"
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import { useUser } from "@clerk/nextjs";
import { useGetCategoriesQuery } from "@/api";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import SearchInput from "@/components/ui/searchInput/SearchInput";
import MenuItem from "./MenuItem";
import { UserNavbarContent } from "./UserNavbarContent";

interface MenuItemType {
  name: string;
  path?: string;
  subItems?: { name: string; path: string }[];
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const { user, isLoaded: isUserLoaded } = useUser();
  const pathName = usePathname() || "";

  const menuItems: MenuItemType[] = [
    { name: "Home", path: "/" },
    {
      name: "Categories",
      subItems: categories.map((category) => ({
        name: category,
        path: `/category/${category.replace(" ", "%20")}`,
      })),
    },
    { name: "Favorites", path: "/favorites" },
    { name: "My Orders", path: "/my-orders" },
  ];

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  return (
    <Navbar className={""} isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            FakeStore
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden gap-8 sm:flex" justify="center">
        {menuItems.map((menuItem, i) => (
          <NavbarItem
            key={`${menuItem.name}-${i}`}
            isActive={
              pathName === menuItem.path ||
              (menuItem.subItems &&
                menuItem.subItems.some((subItem) => pathName === subItem.path))
            }
          >
            <MenuItem
              menuItem={menuItem}
              pathName={pathName}
              isLoading={isLoading}
              categories={categories}
            />
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent
        as="div"
        className="hidden items-center lg:flex"
        justify="end"
      >
        <SearchInput />
      </NavbarContent>
      <UserNavbarContent user={user} cartItems={cartItems} />
      <NavbarMenu className="z-40">
        {menuItems.map((menuItem, index) => (
          <NavbarMenuItem key={`${menuItem}-${index}`}>
            <MenuItem
              menuItem={menuItem}
              pathName={pathName}
              isLoading={isLoading}
              categories={categories}
            />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
