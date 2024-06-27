import React from "react";
import { Button } from "@nextui-org/react";
import { FavEmpty, FavFull } from "../../../../public/icon";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "@/features/favoriteSlice";
import { RootState } from "@/store";
import { Product } from "@/api";
import { showToast } from "@/utils";
import { useUser } from "@clerk/nextjs";

interface AddToFavoriteBtnProps {
  productItem: Product;
  classname?: string;
}

export default function AddToFavoriteBtn({
  productItem,
  classname,
}: AddToFavoriteBtnProps) {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some((item) => item.id === productItem.id),
  );
  const { user } = useUser();

  const handleAddToFavorites = () => {
    if (!user) {
      showToast("You must log in for this process", "info");
    } else {
      if (isFavorited) {
        dispatch(
          removeFromFavorites({ productId: productItem.id, userId: user.id }),
        );
        showToast("Product removed from favorites", "warning");
      } else {
        dispatch(addToFavorites({ product: productItem, userId: user.id }));
        showToast("Product added to favorites", "success");
      }
    }
  };

  return (
    <Button
      isIconOnly
      className={`absolute z-30 bg-white  ${classname}`}
      onClick={handleAddToFavorites}
    >
      <span className="rounded-full">
        {isFavorited && user ? <FavFull /> : <FavEmpty />}
      </span>
    </Button>
  );
}
