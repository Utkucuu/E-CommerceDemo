"use client";
import { useGetProductsQuery } from "@/api";
import CardGroup from "@/components/productLayouts/cardGroup";
import SlickCarousel from "@/components/slickCarousel/SlickCarousel";
import SearchInput from "@/components/ui/searchInput/SearchInput";

export default function Home() {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <main>
      <section className="items-center lg:hidden">
        <SearchInput />
      </section>

      <section>
        <SlickCarousel />
      </section>

      <section>
        <CardGroup products={products} error={error} isLoading={isLoading} />
      </section>
    </main>
  );
}
