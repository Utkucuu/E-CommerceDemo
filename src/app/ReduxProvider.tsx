"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialState as setCartInitialState } from "@/features/cartSlice";
import { setInitialState as setFavoriteInitialState } from "@/features/favoriteSlice";
import { setInitialState as setOrdersInitialState } from "@/features/ordersSlice";

function InitializeUserState() {
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(setCartInitialState({ userId: user.id }));
      dispatch(setFavoriteInitialState({ userId: user.id }));
      dispatch(setOrdersInitialState({ userId: user.id }));
    }
  }, [user, dispatch]);

  return null;
}

const ReduxProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <InitializeUserState />
    {children}
  </Provider>
);

export default ReduxProvider;
