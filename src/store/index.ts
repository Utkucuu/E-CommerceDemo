import { configureStore } from "@reduxjs/toolkit";
import { fakeStoreApi } from "@/api";
import { productSlice } from "@/features";
import { favoriteSlice } from "@/features/favoriteSlice";
import { cartSlice } from "@/features/cartSlice";
import { ordersSlice } from "@/features/ordersSlice";
export const store = configureStore({
  reducer: {
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,

    products: productSlice.reducer,
    favorites: favoriteSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
