"use client";
import { RootState } from "@/store";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRouter } from "next/navigation";
import Rating from "../ui/rating";
import { generateProductUrl } from "@/utils";
import { TbEyeShare } from "react-icons/tb";


export default function SlickCarousel() {
  const sliderProducts = useSelector(
    (state: RootState) => state.products.products,
  );

  const reversedProducts = [...sliderProducts].reverse();

  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: "start",
    centerMode: true,
    autoplay: true,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    centerPadding: "8px",
 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container rounded-xl py-10">
      <Slider {...settings}>
        {reversedProducts?.map((product) => (
          <div className="p-2" key={product.id}>
            <Card className="md:h-[350px] md:w-60" shadow="sm">
              <CardHeader className="flex justify-center pt-3">
                <Image
                  src={product.image}
                  alt={product.title}
                  className="h-24 w-full object-contain md:h-48"
                />
              </CardHeader>
              <CardBody className="overflow-hidden px-2 pb-0 pt-0">
                <h3 className="h-12 w-full p-0 text-xs font-thin md:max-h-min">
                  {product.title}
                </h3>
              </CardBody>
              <CardFooter className="flex flex-col items-start justify-end pt-0">
                <div className="text-gray-700">
                  <Rating rating={product.rating.rate} maxRating={5} />
                </div>
                <div>
                  <p className="truncate text-xs font-bold text-gray-700">
                    {product.category}
                  </p>
                </div>

                <div className="flex w-full items-end justify-between">
                  <p className="text-gray-700">${product.price}</p>
                  <Button
                    size="sm"
                    isIconOnly
                    className="absolute bottom-1 right-1 rounded-full bg-warning-500 p-0 hover:cursor-pointer md:p-1"
                    onClick={() => {
                      const url = generateProductUrl(product);
                      router.push(url);
                    }}
                  >
                    <TbEyeShare className="size-6 text-white" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
