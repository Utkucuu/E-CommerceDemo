import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { Input, Chip, Button, Spinner } from "@nextui-org/react";
import Message from "./Message";

interface CardDetailsFormProps {
  cartTotal: number;
  isProcessing: boolean;
  message: string;
  errMessage: string;
}

const CardDetailsForm = ({
  cartTotal,
  isProcessing,
  message,
  errMessage,
}: CardDetailsFormProps) => {
  return (
    <div className="col-span-12 md:col-span-6 md:pe-2 md:ps-6">
      <div className="mx-auto space-y-5 rounded-xl border-2 p-4">
        <h3 className="text-center font-bold">Card Details</h3>
        <Input
          variant="underlined"
          className="border-bottom-1 w-48 border-dashed"
          placeholder="Cardholder Name"
          name="cardholderName"
          pattern="[A-Za-z\s]+"
          errorMessage="Please enter a valid character"
        />
        <CardElement />
        <div className="flex items-center justify-between pt-4">
          <Chip
            variant="shadow"
            classNames={{
              base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
              content: "drop-shadow shadow-black text-white",
            }}
          >
            Total: ${cartTotal}
          </Chip>

          <Button
            type="submit"
            disabled={isProcessing}
            color="primary"
            className="flex items-center justify-center text-white"
          >
            {isProcessing ? (
              <>
                Processing
                <Spinner color="white" size="sm" className="mr-2" />
              </>
            ) : (
              "Pay"
            )}
          </Button>
        </div>
      </div>
      <Message message={message} errMessage={errMessage} />
    </div>
  );
};

export default CardDetailsForm;
