"use client";
import { useRouter } from "next/navigation";
import { generateProductUrl } from "@/utils";
import { Product, useGetProductsQuery } from "@/api";
import Image from "next/image"; // next/image import edildi

interface SearchResultsProps {
  searchTerm: string;
  setIsDropdownOpen: (isOpen: boolean) => void;
}

const SearchResults = ({
  searchTerm,
  setIsDropdownOpen,
}: SearchResultsProps) => {
  const { data: products = [], error, isLoading } = useGetProductsQuery();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  if (error) {
    return <div>Error loading products</div>;
  }

  const filteredProducts = products.filter((product: Product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (product: Product) => {
    const url = generateProductUrl(product);
    router.push(url);
    setIsDropdownOpen(false);
  };

  return (
    <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-md bg-white shadow-lg">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product: Product) => (
          <div
            key={product.id}
            onClick={() => handleSelect(product)}
            className="flex cursor-pointer items-center border-b p-2 transition last:border-none hover:bg-gray-100"
          >
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={product.image}
                alt={product.title}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="ml-4 text-xs font-bold">{product.title}</div>
          </div>
        ))
      ) : (
        <div className="p-2 text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default SearchResults;
