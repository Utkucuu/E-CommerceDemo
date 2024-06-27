import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  size?: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
  addedToConfirmCart: boolean;
}

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query<string[], void>({
      query: () => "products/categories",
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/${category}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = fakeStoreApi;
