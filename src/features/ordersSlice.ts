import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItem, setItem } from "@/utils";

interface Order {
  paymentIntent: any;
  billingDetails: any;
  products: any[];
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction<{ userId: string }>) => {
      const { userId } = action.payload;
      state.orders = getItem("orders", userId) || [];
    },
    addOrder: (
      state,
      action: PayloadAction<{ order: Order; userId: string }>,
    ) => {
      const { order, userId } = action.payload;
      state.orders.unshift(order);
      setItem("orders", state.orders, userId);
    },
  },
});

export const { setInitialState, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
