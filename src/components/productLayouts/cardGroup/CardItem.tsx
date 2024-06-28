"use client";
import Rating from "@/components/ui/rating";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { Product } from "@/api";
import AddToFavoriteBtn from "@/components/ui/buttons/AddToFavoriteBtn";
import AddToCartBtn from "@/components/ui/buttons/AddToCartBtn";
import { generateProductUrl } from "@/utils";

interface CardItemProps {
  productItem: Product;
  
  router: any;
}

export default function CardItem({
  productItem,
  
  router,
}: CardItemProps) {
  return (
    <Card
      shadow="sm"

      isPressable
      onPress={() => {
        const url = generateProductUrl(productItem);
        router.push(url);
      }}
    >
      <CardBody className="relative items-center overflow-visible px-3 pb-0">
        <AddToFavoriteBtn
          productItem={productItem}
          classname={"left-0 top-0 rounded-full"}
        />
        <Image
          as={NextImage}
          shadow="sm"
          radius="lg"
          width={200}
          height={100}
          alt={productItem.title}
          className="h-[140px] w-full object-contain"
          src={productItem.image}
          quality={50}
          isZoomed
        />
        <div className="my-auto flex items-center justify-center">
          <p className="w-full pb-0 text-xs mt-1 font-thin text-slate-600">
            {productItem.title}
          </p>
        </div>
      </CardBody>
      <CardFooter className="flex-col items-start py-0 text-small">
        <h3 className="text-xs font-bold">{productItem.category}</h3>
        <div className="flex flex-wrap items-start">
          <Rating rating={productItem.rating.rate} maxRating={5} />
          <span className="text-xs text-slate-500">
            ({productItem.rating.rate}/{productItem.rating.count})
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <div>
            <p className="text-default-500">${productItem.price} </p>
          </div>
          <div className="my-3">
            <AddToCartBtn productItem={productItem} classname={"pr-2"} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
