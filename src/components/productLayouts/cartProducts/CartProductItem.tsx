"use client";
import { Product } from "@/api";
import Image from "next/image";
import CartProductItemSize from "@/components/ui/cartProductItemSize";
import CartProductItemQuantity from "@/components/ui/cartProductItemQuantity";
import AddToCartBtn from "@/components/ui/buttons/AddToCartBtn";
import CheckedITem from "@/components/ui/checkedbox/CheckedITem";
import { Chip } from "@nextui-org/react";

interface CartProductItemProps {
  productItem: Product;
}

export default function CartProductItem({ productItem }: CartProductItemProps) {
  const isClothingItem =
    productItem.category === "men's clothing" ||
    productItem.category === "women's clothing";

  return (
    <>
      <div className="relative mb-12 flex flex-col rounded-xl border-1 border-slate-200 p-5 lg:flex-row">
        <div className="mb-4 flex-shrink-0 lg:mb-0 lg:mr-4">
          <CheckedITem productItem={productItem} />
        </div>
        <div className="mb-4 flex-shrink-0 lg:mb-0 lg:mr-4">
          <Image
            alt={productItem.title}
            className="h-[120px] w-[120px] rounded-xl border-1 border-slate-200 object-contain p-1"
            src={productItem.image}
            width={120}
            height={120}
          />
        </div>

        <div className="flex w-full flex-col lg:flex-grow lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-grow lg:mr-4 lg:flex lg:flex-col lg:justify-center">
            <div className="font-bold max-w-[650px]">
              {productItem.title}{" "}
              <Chip
                variant="shadow"
                classNames={{
                  base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                  content: "drop-shadow shadow-black text-white",
                }}
              >
                ${productItem.price}
              </Chip>
            </div>

            <div className="mt-5 flex flex-wrap gap-5">
              <CartProductItemQuantity productItem={productItem} />
              {isClothingItem && (
                <CartProductItemSize productItem={productItem} />
              )}
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4 flex flex-col items-center">
          <AddToCartBtn productItem={productItem} />
        </div>
      </div>
    </>
  );
}
