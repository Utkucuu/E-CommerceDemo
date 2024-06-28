"use client";
import { useGetProductByIdQuery } from "@/api";
import Loading from "@/app/loading";
import ProductDetail from "@/components/productLayouts/productDetail";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ProductDetailPage({
  params,
}: {
  params: { id: string, title:string };
}) {

  const router = useRouter() 

  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(parseInt(params.id));


  useEffect(() => {
    if (product) {
      const updatedTitle = product.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      if (updatedTitle !== params.title) {
        router.replace(
          `/product-detail/${product.category}/${product.id}/${updatedTitle}`,
        );
      }
    }
  }, [product, params.title, router]);


  if (isLoading) return <Loading />;
  if (error) {
    if ("status" in error) {
      return (
        <div>
          Error: {error.status} - {JSON.stringify(error.data)}
        </div>
      );
    } else if (error instanceof Error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <div>An unknown error occurred</div>;
    }
  }
  if (!product) notFound();

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}
