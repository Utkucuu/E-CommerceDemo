import {
  NavbarContent,
  NavbarItem,
  Button,
  Badge,
  Link,
} from "@nextui-org/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

interface UserNavbarContentProps {
  user: any;
  cartItems: any[];
}

export const UserNavbarContent = ({ user, cartItems }: UserNavbarContentProps) => (
  <NavbarContent justify="end" className="divide-x-1">
    {user && (
      <NavbarItem>
        <Link href="/cart">
          <Badge
            className="text-white border-none text-medium font-bold font-mono bg-red-500"
            
            content={`${cartItems.length}`}
            shape="rectangle"
          >
            <Button
              color="warning"
              className={"text-medium font-thin text-white"}
              size="sm"
            >
              <span className="hidden items-center lg:flex"> Cart</span>{" "}
              <MdOutlineShoppingCartCheckout className={"size-6"} />
            </Button>
          </Badge>
        </Link>
      </NavbarItem>
    )}
    <NavbarItem className="flex items-center ps-3">
      <SignedOut>
        <SignInButton mode="modal">
          <span className="cursor-pointer rounded-lg bg-blue-600 px-2 py-1 text-sm text-white transition-colors hover:bg-blue-200 hover:text-gray-600">
            Sign in
          </span>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </NavbarItem>
    <div className="hidden items-center ps-3 lg:flex">{user?.firstName}</div>
  </NavbarContent>
);
