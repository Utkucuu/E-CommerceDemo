"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import FavoriteProduct from "@/components/productLayouts/favoriteProducts";
import Loading from "../loading";
import withAuth from "@/hoc/withAuth";

const FavoriteProducts = () => {
  const favoriteProductList = useSelector(
    (state: RootState) => state.favorites.favoriteItems,
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [favoriteProductList]);

  if (isLoading) {
    return <Loading />;
  } else {
    return <FavoriteProduct favoriteProductList={favoriteProductList} />;
  }
};
export default withAuth(FavoriteProducts);
