import { Product } from "@/api";
import CartProductItem from "./CartProductItem";
import ConfirmTheCart from "./ConfirmTheCart";
import PageTitle from "@/components/ui/pageTitle";
interface CartProductListProps {
  cartProductList: Product[];
}

export default function CartProductList({
  cartProductList,
}: CartProductListProps) {
  console.log(cartProductList);

  return (
    <>
      {cartProductList.length === 0 ? (
        <PageTitle titleContent="No product added to cart" />
      ) : (
        <PageTitle titleContent="cart" />
      )}

      <div className="block md:hidden">
        <ConfirmTheCart />
      </div>
      <div className="grid grid-cols-12 gap-x-2">
        <div className="col-span-full md:col-span-9">
          {cartProductList?.map((productItem, index) => (
            <CartProductItem
              productItem={productItem}
              key={`${productItem}-${index}`}
            />
          ))}
        </div>
        <div className="col-span-3 hidden md:block">
          <ConfirmTheCart />
        </div>
      </div>
    </>
  );
}
