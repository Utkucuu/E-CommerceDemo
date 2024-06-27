"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import ConfirmTheCartBtn from "@/components/ui/buttons/ConfirmTheCartBtn";
import { calculateCartTotal } from "@/features/cartSlice";
import { useUser } from "@clerk/nextjs";

export default function ConfirmTheCart() {
  const addedToConfirmCartProduct = useSelector(
    (state: RootState) => state.cart.cartItems,
  );

  const dispatch = useDispatch();
  const { user } = useUser();

  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);

  useEffect(() => {
    if (user) {
      dispatch(calculateCartTotal({ userId: user.id }));
    }
  }, [addedToConfirmCartProduct, dispatch, user]);

  return (
    <>
      {(addedToConfirmCartProduct.length && (
        <div className="w-full space-y-2 pb-8 md:fixed md:top-20 md:w-[355px] md:px-10">
          <ConfirmTheCartBtn
            addedToConfirmCartProduct={addedToConfirmCartProduct}
          />
          <ul className="h-48 overflow-y-auto rounded-lg border-1 p-3">
            {addedToConfirmCartProduct?.length! > 0
              ? addedToConfirmCartProduct?.map(
                  (productItem) =>
                    productItem.addedToConfirmCart && (
                      <li
                        className="flex flex-col border-b"
                        key={`${productItem.id} - ${productItem.title}`}
                      >
                        <div className="text-start text-xs font-bold">
                          {`${productItem.title}  ${
                            productItem.size ? ` - ${productItem.size}` : ""
                          } `}
                        </div>
                        <div className="text-end text-sm font-bold text-warning-500">
                          ${productItem.price} x {productItem.quantity} = $
                          {productItem.price * productItem.quantity}
                        </div>
                      </li>
                    ),
                )
              : ""}
          </ul>
          {(addedToConfirmCartProduct.length && (
            <div className="text-right font-bold">Total: ${cartTotal}</div>
          )) ||
            ""}
          <ConfirmTheCartBtn
            addedToConfirmCartProduct={addedToConfirmCartProduct}
          />
        </div>
      )) ||
        ""}
    </>
  );
}
