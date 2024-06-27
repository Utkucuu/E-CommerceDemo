import { updateCartItemSize } from "@/features/cartSlice";
import { Slider } from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "@/api";
import { useUser } from "@clerk/nextjs";

interface CartProductItemSizeProps {
  productItem: Product;
}
export type SliderStepMarks = {
  value: number;
  label: string;
}[];

export default function CartProductItemSize({
  productItem,
}: CartProductItemSizeProps) {
  const dispatch = useDispatch();
  const { user } = useUser();

  const marks: SliderStepMarks = [
    { value: 1, label: "S" },
    { value: 2, label: "M" },
    { value: 3, label: "L" },
    { value: 4, label: "XL" },
  ];
  const defaultSizeValue =
    marks.find((mark) => mark.label === productItem.size)?.value || 1;

  const handleResize = (value: number | number[]) => {
    let selectedSize = "S";
    if (Array.isArray(value)) {
      selectedSize = marks[value[0] - 1].label;
    } else {
      selectedSize = marks[value - 1].label;
    }

    if (user) {
      dispatch(
        updateCartItemSize({
          productId: productItem.id,
          size: selectedSize,
          userId: user.id,
        }),
      );
    } else {
    }
  };

  return (
    <Slider
      aria-label="Size"
      defaultValue={defaultSizeValue}
      size="sm"
      step={1}
      marks={marks}
      color="primary"
      showSteps={true}
      maxValue={4}
      minValue={1}
      className="w-40"
      onChange={handleResize}
    />
  );
}
