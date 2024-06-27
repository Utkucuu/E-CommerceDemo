import { Product } from "@/api";
import { addToCart, removeFromCart } from "@/features/cartSlice";
import { Button } from "@nextui-org/react";
import { BsCartPlusFill, BsFillCartDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { showToast } from "@/utils";
import { useUser } from "@clerk/nextjs";

interface AddToCartBtnProps {
  productItem: Product;
  classname?: string;
  content?: string;
}

export default function AddToCartBtn({
  productItem,
  classname,
}: AddToCartBtnProps) {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const { user } = useUser();
  const addedToCart = useSelector((state: RootState) =>
    state.cart.cartItems.some((item) => item.id === productItem.id),
  );

  const handleAddToCart = () => {
    if (!user) {
      showToast("You must log in for this process", "info");
    } else {
      if (addedToCart) {
        dispatch(
          removeFromCart({ productId: productItem.id, userId: user.id }),
        );
        showToast("Product removed from cart", "warning");
      } else {
        dispatch(addToCart({ product: productItem, userId: user.id }));
        showToast("Product added to cart", "success");
      }
    }
  };

  const cartProductList = useSelector(
    (state: RootState) => state.cart.cartItems,
  );
  const [content, setContent] = useState("");

  useEffect(() => {
    if (pathName) {
      if (
        pathName === "/" ||
        pathName === "/cart" ||
        pathName.includes("category")
      ) {
        setContent("");
      } else {
        if (cartProductList.some((item) => item.id === productItem.id)) {
          setContent("Added To Cart");
        } else {
          setContent("Add To Cart");
        }
      }
    }
  }, [cartProductList, productItem, pathName]);

  return (
    <Button
      isIconOnly
      color="warning"
      variant="shadow"
      className={`px-2 text-white ${classname}`}
      onClick={handleAddToCart}
    >
      <span className={`${content === "" ? null : "px-2"} `}>{content}</span>
      {addedToCart && user ? (
        <BsFillCartDashFill className={"size-6"} />
      ) : (
        <BsCartPlusFill className={"size-6"} />
      )}
    </Button>
  );
}
