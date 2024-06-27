import { Product } from "@/api";
import { updateCartItemState } from "@/features/cartSlice";
import { RootState } from "@/store";
import { Checkbox } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";

interface CheckedItemProps {
  productItem: Product;
}
export default function CheckedItem({ productItem }: CheckedItemProps) {
  const { user } = useUser();

  const isChecked = useSelector((state: RootState) => {
    const item = state.cart.cartItems.find((i) => i.id === productItem.id);
    return item?.addedToConfirmCart || false;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        updateCartItemState({
          productId: productItem.id,
          addedToConfirmCart: isChecked,
          userId: user.id,
        }),
      );
    }
  }, [isChecked, dispatch, productItem.id, user]);

  const handleCheckboxChange = () => {
    if (user) {
      dispatch(
        updateCartItemState({
          productId: productItem.id,
          addedToConfirmCart: !isChecked,
          userId: user.id,
        }),
      );
    }
  };

  return (
    <Checkbox
      color="warning"
      size="lg"
      classNames={{
        icon: "text-white",
      }}
      isSelected={isChecked}
      onChange={handleCheckboxChange}
    />
  );
}
