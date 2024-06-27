"use client";
import { useGetProductsByCategoryQuery } from "@/api";
import CardGroup from "@/components/productLayouts/cardGroup";
import { usePathname } from "next/navigation";
interface CategoriesPageProps {
  params: {
    slug: string;
  };
}
export default function Categories({ params }: CategoriesPageProps) {
  const pathName = usePathname();
  const category = pathName;
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductsByCategoryQuery(category as string);
  const { slug } = params;
  return <CardGroup products={products} error={error} isLoading={isLoading} />;
}
