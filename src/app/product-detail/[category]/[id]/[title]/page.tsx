"use client";
import { useGetProductByIdQuery } from "@/api";
import Loading from "@/app/loading";
import ProductDetail from "@/components/productLayouts/productDetail";
import { notFound } from "next/navigation";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductByIdQuery(parseInt(params.id));

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
