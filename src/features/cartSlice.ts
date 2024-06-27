import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/api";
import { getItem, setItem } from "@/utils";

interface CartState {
  cartItems: Product[];
  cartTotal: number;
}

const initialState: CartState = {
  cartItems: [],
  cartTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.cartItems = getItem("cartProducts", userId) || [];
      state.cartTotal = getItem("cartTotal", userId) || 0;
    },
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; userId: string }>,
    ) => {
      const { product, userId } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity!++;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
          size:
            product.category === "men's clothing" ||
            product.category === "women's clothing"
              ? "S"
              : undefined,
          addedToConfirmCart: false,
        });
      }
      setItem("cartProducts", state.cartItems, userId);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: number; userId: string }>,
    ) => {
      const { productId, userId } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      setItem("cartProducts", state.cartItems, userId);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
        userId: string;
      }>,
    ) => {
      const { productId, quantity, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === productId,
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = quantity;
      }
      setItem("cartProducts", state.cartItems, userId);
    },
    updateCartItemSize: (
      state,
      action: PayloadAction<{
        productId: number;
        size: string;
        userId: string;
      }>,
    ) => {
      const { productId, size, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === productId,
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].size = size;
      }
      setItem("cartProducts", state.cartItems, userId);
    },
    updateCartItemState: (
      state,
      action: PayloadAction<{
        productId: number;
        addedToConfirmCart: boolean;
        userId: string;
      }>,
    ) => {
      const { productId, addedToConfirmCart, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === productId,
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].addedToConfirmCart = addedToConfirmCart;
      }
      setItem("cartProducts", state.cartItems, userId);
    },
    calculateCartTotal: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.cartTotal = state.cartItems.reduce((total, item) => {
        if (item.addedToConfirmCart && item.quantity) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0);
      setItem("cartTotal", state.cartTotal, userId);
    },
    clearConfirmedItems: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => !item.addedToConfirmCart,
      );
      setItem("cartProducts", state.cartItems, userId);
      state.cartTotal = state.cartItems.reduce((total, item) => {
        if (item.addedToConfirmCart && item.quantity) {
          return total + item.price * item.quantity;
        }
        return total;
      }, 0);
      setItem("cartTotal", state.cartTotal, userId);
    },
  },
});

export const {
  setInitialState,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  updateCartItemSize,
  updateCartItemState,
  calculateCartTotal,
  clearConfirmedItems,
} = cartSlice.actions;
