"use client";
import PaymentForm from "@/components/payment/PaymentForm";
import ProductsTabContent from "@/components/payment/ProductsTabContent";
import PaymentBackBtn from "@/components/ui/buttons/PaymentBackBtn";
import PaymentNextBtn from "@/components/ui/buttons/PaymentNextBtn";
import PageTitle from "@/components/ui/pageTitle";
import withAuth from "@/hoc/withAuth";
import { RootState } from "@/store";
import { Tabs, Tab, Card, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Payment = () => {
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const addedToConfirmCartProduct = useSelector(
    (state: RootState) => state.cart.cartItems,
  );

  const [selectedKey, setSelectedKey] = useState(["Products", "Payment"]);
  const [num, setNum] = useState(0);

  return (
    <Tabs
      classNames={{
        tabContent: "group-data-[selected=true]:text-[#fff]",
      }}
      aria-label="Options"
      placement={"top"}
      variant="light"
      color="warning"
      selectedKey={selectedKey[num]}
    >
      <Tab key="Products" title="1-Products">
        <Card className="">
          <CardBody className="flex flex-col justify-between">
            <ul className="overflow-y-auto rounded-lg p-3">
              {addedToConfirmCartProduct?.length! > 0 ? (
                addedToConfirmCartProduct?.map(
                  (productItem, index) =>
                    productItem.addedToConfirmCart && (
                      <ProductsTabContent
                        key={index}
                        productItem={productItem}
                      />
                    ),
                )
              ) : (
                <PageTitle titleContent="No confirmed products found" />
              )}
            </ul>
            {(addedToConfirmCartProduct.length && (
              <div className="flex items-end justify-between pt-2 font-bold w-full">
                <div className="text-end text-warning-500">
                  Total: ${cartTotal}
                </div>
                <PaymentNextBtn setNum={setNum} num={num} />
              </div>
            )) ||
              ""}
          </CardBody>
        </Card>
      </Tab>
      <Tab className="text-white" key="Payment" title="2-Payment">
        <Card>
          <CardBody>
            <PaymentForm />
          </CardBody>
          <CardFooter>
            <div>
              <PaymentBackBtn setNum={setNum} num={num} />
            </div>
          </CardFooter>
        </Card>
      </Tab>
    </Tabs>
  );
};
export default withAuth(Payment);
