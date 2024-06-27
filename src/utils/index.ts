"use client";
import { Product } from "@/api";
import { toast } from "react-toastify";

export const getItem = (key: string, userId: string | undefined) => {
  try {
    if (!userId) throw new Error("User ID is not defined");
    const item = localStorage.getItem(`${userId}_${key}`);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    return null;
  }
};

export const setItem = (
  key: string,
  value: any,
  userId: string | undefined,
) => {
  try {
    if (!userId) throw new Error("User ID is not defined");
    localStorage.setItem(`${userId}_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item to localStorage:", error);
  }
};

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const showToast = (
  message: string,
  type: "success" | "warning" | "error" | "info",
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast.warning("An error occurred");
  }
};

export const generateProductUrl = (product: Product) => {
  return `/product-detail/${product.category}/${product.id}/${product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
};

import { ChipProps } from "@nextui-org/react";

export const statusOptions = [
  { name: "Confirmed", uid: "confirmed" },
  { name: "Preparing", uid: "preparing" },
  { name: "Delivered", uid: "delivered" },
];

export const statusColorMap: Record<string, ChipProps["color"]> = {
  confirmed: "success",
  preparing: "secondary",
  delivered: "warning",
};
