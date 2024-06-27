import { Product } from "@/api";
import { updateCartItemQuantity } from "@/features/cartSlice";
import { Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/nextjs";

interface CartProductItemQuantityProps {
  productItem: Product;
}

export default function CartProductItemQuantity({
  productItem,
}: CartProductItemQuantityProps) {
  const dispatch = useDispatch();
  const { user } = useUser();

  const quantity = [
    { key: 1, label: "1" },
    { key: 2, label: "2" },
    { key: 3, label: "3" },
    { key: 4, label: "4" },
    { key: 5, label: "5" },
    { key: 6, label: "6" },
    { key: 7, label: "7" },
    { key: 8, label: "8" },
    { key: 9, label: "9" },
    { key: 10, label: "10" },
  ];

  const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    let newQuantity: number;
    if (Array.isArray(value)) {
      newQuantity = Number(value[0]);
    } else {
      newQuantity = Number(value);
    }

    if (user) {
      dispatch(
        updateCartItemQuantity({
          productId: productItem.id,
          quantity: newQuantity,
          userId: user.id,
        }),
      );
    }
  };

  return (
    <Select
      labelPlacement={"outside"}
      label="Quantity"
      size="sm"
      className="min-h-0 w-20"
      defaultSelectedKeys={
        productItem.quantity ? productItem.quantity.toString() : "1"
      }
      onChange={(event) => handleQuantityChange(event)}
    >
      {quantity.map((num) => (
        <SelectItem key={num.key} value={num.key} textValue={num.label}>
          {num.label}
        </SelectItem>
      ))}
    </Select>
  );
}
