"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Product } from "@/api";
import Rating from "@/components/ui/rating";
import { useRouter } from "next/navigation";
import AddToCartBtn from "@/components/ui/buttons/AddToCartBtn";
import AddToFavoriteBtn from "@/components/ui/buttons/AddToFavoriteBtn";
import { useEffect, useState } from "react";
import { generateProductUrl } from "@/utils";

interface FavoriteProductItemProps {
  productItem: Product;
}

export default function FavoriteProductItem({
  productItem,
}: FavoriteProductItemProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return (
    <Card
      className="w-full cursor-pointer border-none"
      shadow="sm"
      isPressable
      onPress={() => {
        const url = generateProductUrl(productItem);
        router.push(url);
      }}
    >
      <CardBody className="flex items-center overflow-visible px-3 py-4">
        <AddToFavoriteBtn
          productItem={productItem}
          classname={"absolute left-2 top-2 rounded-full"}
        />
        <div className="grid grid-cols-12 items-center gap-4">
          <div className="relative col-span-4 md:col-span-3">
            <Image
              alt={productItem.title}
              className="h-[100px] object-contain md:h-[150px]"
              src={productItem.image}
              width={200}
              height={100}
            />
          </div>
          <div className="col-span-8 flex flex-col gap-2 md:col-span-9">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold md:text-lg">
                {productItem.title}
              </p>
              <p className="text-xs text-gray-600 md:text-sm">
                {productItem.category}
              </p>
              <p className="text-xs text-gray-600 md:text-sm">
                Rate: {productItem.rating.rate}/{productItem.rating.count}
              </p>
              <Rating rating={productItem.rating.rate} maxRating={5} />
              <p className="text-sm text-default-500 md:text-base">
                ${productItem.price}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <div className="p-0">
          <AddToCartBtn productItem={productItem} classname={"w-full"} />
        </div>
      </CardFooter>
    </Card>
  );
}
