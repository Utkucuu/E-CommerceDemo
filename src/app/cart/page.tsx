"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import CartProducts from "@/components/productLayouts/cartProducts";
import Loading from "../loading";
import withAuth from "@/hoc/withAuth";

const Cart = () => {
  const cartProductList = useSelector(
    (state: RootState) => state.cart.cartItems,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [cartProductList]);

  if (isLoading) {
    return <Loading />;
  }

  return <CartProducts cartProductList={cartProductList} />;
};

export default withAuth(Cart);
