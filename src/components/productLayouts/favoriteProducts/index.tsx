"use client";
import React from "react";
import { Product } from "@/api";
import FavoriteProductItem from "./FavoriteProductItem";
import PageTitle from "@/components/ui/pageTitle";

interface FavoriteProductListProps {
  favoriteProductList: Product[];
}

export default function FavoriteProducts({
  favoriteProductList,
}: FavoriteProductListProps) {
  return (
    <>
      {favoriteProductList.length === 0 ? (
        <PageTitle titleContent="No product added to favorite" />
      ) : (
        <PageTitle titleContent={"favorites"} />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {favoriteProductList?.map((productItem, index) => (
          <FavoriteProductItem
            key={`${productItem}-${index}`}
            productItem={productItem}
          />
        ))}
      </div>
    </>
  );
}
