"use client";
import CardItem from "./CardItem";
import { Product } from "@/api";
import Loading from "@/app/loading";
import PageTitle from "@/components/ui/pageTitle";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type CardGroupProps = {
  products: any;
  error: any;
  isLoading: boolean;
};

export default function CardGroup({
  products,
  error,
  isLoading,
}: CardGroupProps) {
  const pathName = usePathname();
  const category = pathName;
  const router = useRouter();
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    if ("status" in error) {
      return <div>Error: {error.status}</div>;
    } else if ("message" in error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>An unknown error occurred</div>;
    }
  }

  return (
    <>
      <PageTitle titleContent={category as string} />

      <div className="md:grid-cols:4 mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {products?.map((productItem: Product, index: number) => (
          <CardItem productItem={productItem} key={index} router={router} />
        ))}
      </div>
    </>
  );
}
