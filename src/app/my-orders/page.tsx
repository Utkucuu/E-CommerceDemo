"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MyOrders from "@/components/myOrders/MyOrders";
import { useEffect, useState } from "react";
import Loading from "../loading";
import withAuth from "@/hoc/withAuth";

const MyOrdersPage = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(true);
  const formatOrders = (orders: any[]) => {
    return orders.map((order, index) => {
      const totalQuantity = order.products.reduce(
        (sum: any, product: { quantity: any }) => sum + product.quantity,
        0,
      );
      return {
        id: order.paymentIntent.id,
        name: order.billingDetails.name,
        email: order.billingDetails.email,
        phone: order.billingDetails.phone,
        address: `${order.billingDetails.address.city}, ${order.billingDetails.address.state}, ${order.billingDetails.address.postal_code}, ${order.billingDetails.address.country}`,
        open_address: `${order.billingDetails.address.line1} `,
        date: new Date(order.paymentIntent?.created * 1000).toLocaleString(),
        status: "confirmed",
        products: order.products.map((product: any) => ({
          title: product.title,
          description: product.description,
          quantity: product.quantity,
          size: product.size,
          price: product.price,
          image: product.image,
          category: product.category,
        })),
        amount: order.paymentIntent?.amount / 100,
        summary: `1 order ${totalQuantity} products`,
      };
    });
  };

  const formattedOrders = formatOrders(orders);

  useEffect(() => {
    setIsLoading(false);
  }, [orders]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <h1 className="mb-6 text-2xl font-bold uppercase">My Orders</h1>
        <MyOrders orders={formattedOrders} />
      </>
    );
  }
};
export default withAuth(MyOrdersPage);
