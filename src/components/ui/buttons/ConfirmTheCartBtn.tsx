import { Product } from "@/api";
import { RootState } from "@/store";
import { showToast } from "@/utils";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/nextjs";

interface ConfirmTheCartBtnProps {
  addedToConfirmCartProduct: Product[];
}

export default function ConfirmTheCartBtn({
  addedToConfirmCartProduct,
}: ConfirmTheCartBtnProps) {
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const { user } = useUser();

  const handleConfirmCartClick = () => {
    if (!user) {
      showToast("You must log in for this process", "info");
    } else {
      return cartTotal === 0
        ? showToast("The cart is empty", "error")
        : localStorage.setItem(
            `${user.id}_cartTotal`,
            JSON.stringify(cartTotal),
          );
    }
  };

  return (
    <>
      {(addedToConfirmCartProduct.length && (
        <Link href={cartTotal === 0 ? "#" : "/cart/payment"}>
          <Button
            onClick={handleConfirmCartClick}
            className="w-full bg-warning-500 text-medium font-thin text-white"
          >
            Confirm The Cart
          </Button>
        </Link>
      )) ||
        null}
    </>
  );
}
