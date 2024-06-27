"use client";
import { Image, Badge } from "@nextui-org/react";
import { Product } from "@/api";
import Rating from "@/components/ui/rating";
import AddToCartBtn from "@/components/ui/buttons/AddToCartBtn";
import AddToFavoriteBtn from "@/components/ui/buttons/AddToFavoriteBtn";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="relative flex flex-col gap-6 sm:flex-row">
        <AddToFavoriteBtn
          productItem={product}
          classname={"absolute left-4 top-4"}
        />
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
        <div className="flex flex-1 flex-col justify-center">
          <div>
            <h2 className="mb-2 text-3xl font-bold">{product.title}</h2>
            <div color="primary">category: {product.category}</div>

            <div>
              <p className="text-gray-600">
                <span>description:</span>
                {product.description}
              </p>
            </div>
            <div className="text-gray-600">
              <Rating rating={product.rating.rate} maxRating={5} />
              <div>
                ratings: {product.rating.rate}/{product.rating.count}{" "}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">
                ${product.price}
              </h3>
            </div>
            <AddToCartBtn classname={"w-full mt-4"} productItem={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
