import { Product } from "@/api";
import { Image } from "@nextui-org/react";
import React from "react";

interface ProductsTabContent {
  productItem: Product;
}

export default function ProductsTabContent({
  productItem,
}: ProductsTabContent) {
  return (
    <li className="flex flex-wrap gap-4 border-b p-4 sm:flex-nowrap">
      <div className="mx-auto mb-4 flex-shrink-0 sm:mx-0 lg:mb-0 lg:mr-4">
        <Image
          alt={productItem.title}
          className="h-[120px] w-[120px] rounded-xl border-1 border-slate-200 object-contain p-1"
          src={productItem.image}
          width={120}
          height={120}
        />
      </div>

      <div className="w-full">
        <div className="text-start text-xs font-bold">
          <h3 className="text-base">{`${productItem.title} ${
            productItem.size ? ` - ${productItem.size}` : ""
          }`}</h3>
          <p className="font-thin">{productItem.description}</p>
          <p>Category: {productItem.category}</p>
          <p>Quantity: {productItem.quantity}</p>
          <p>Price: ${productItem.price}</p>
          {productItem.size && <p>Size: {productItem.size}</p>}
        </div>
        <div className="mt-2 text-end text-sm font-bold text-warning-500 lg:mt-0">
          ${productItem.price} x {productItem.quantity} = $
          {productItem.price * productItem.quantity}
        </div>
      </div>
    </li>
  );
}
