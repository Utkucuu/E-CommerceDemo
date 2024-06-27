import { createSlice } from "@reduxjs/toolkit";
import { Product, fakeStoreApi } from "@/api";

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      fakeStoreApi.endpoints.getProducts.matchFulfilled,
      (state, { payload }) => {
        state.products = payload;
      },
    );
  },
});
