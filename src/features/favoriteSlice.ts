import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/api";
import { getItem, setItem } from "@/utils";

interface FavoriteState {
  favoriteItems: Product[];
}

const initialState: FavoriteState = {
  favoriteItems: [],
};

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.favoriteItems = getItem("favorites", userId) || [];
    },
    addToFavorites: (
      state,
      action: PayloadAction<{ product: Product; userId: string }>,
    ) => {
      const { product, userId } = action.payload;
      if (!state.favoriteItems.some((item) => item.id === product.id)) {
        state.favoriteItems.push(product);
        setItem("favorites", state.favoriteItems, userId);
      }
    },
    removeFromFavorites: (
      state,
      action: PayloadAction<{ productId: number; userId: string }>,
    ) => {
      const { productId, userId } = action.payload;
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== productId,
      );
      setItem("favorites", state.favoriteItems, userId);
    },
  },
});

export const { setInitialState, addToFavorites, removeFromFavorites } =
  favoriteSlice.actions;
