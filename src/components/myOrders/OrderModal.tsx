import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import OrderPDF from "./OrderPDF";
import PdfIcon from "../../../public/icon";
import Image from "next/image";

type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  open_address: string;
  date: string;
  products: any[];
  amount: number;
  status: string;
  summary: string;
};

type OrderModalProps = {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
};

export default function OrderModal({
  order,
  isOpen,
  onClose,
}: OrderModalProps) {
  return (
    <div className="max-w-full overflow-auto">
      {" "}
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        className="mb-12 mt-12 max-h-[calc(100vh-100px)] overflow-y-scroll"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Order Details
          </ModalHeader>
          <ModalBody className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Order id:</h3>
              <div className="text-xs">{order.id}</div>
              <Divider className="mt-2" />
            </div>

            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Customer Name:</h3>
              <div className="text-xs">{order.name}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Open Address:</h3>
              <div className="text-xs">{order.open_address}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Email:</h3>
              <div className="text-xs">{order.email}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Phone:</h3>
              <div className="text-xs">{order.phone}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Address:</h3>
              <div className="text-xs">{order.address}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Order Date:</h3>
              <div className="text-xs">{order.date}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Status:</h3>
              <div className="text-xs">{order.status}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-bold">Total Amount:</h3>
              <div className="text-xs">${order.amount}</div>
              <Divider className="mt-2" />
            </div>
            <div className="flex flex-col">
              <PDFDownloadLink
                document={<OrderPDF order={order} />}
                fileName={`order_${order.id}.pdf`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <PdfIcon />
              </PDFDownloadLink>
            </div>

            <div className="md:col-span-2">
              <div>
                {order.products.map((product, index) => (
                  <div key={index}>
                    <h2 className="mb-2 font-bold">Product {index + 1}</h2>

                    <div className="mb-4 mt-3 flex flex-col sm:flex-row rounded-lg border p-4  text-start text-xs font-bold mx-auto">
                      <Image
                        alt={product.title}
                        className="h-[120px] w-[120px] mx-auto sm:mx-0 rounded-xl border-1 border-slate-200 object-contain p-1"
                        src={product.image}
                        width={120}
                        height={120}
                      />

                      <div className=" ms-0 sm:ms-10 mt-5 sm:mt-0">
                        <h3>{`${product.title} 
                       ${product.size ? ` - ${product.size}` : ""} `}</h3>

                        <p className="font-thin">{product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.price}</p>
                        {product.size && <p>Size:{product.size}</p>}
                      </div>

                      <div className="flex flex-col"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
