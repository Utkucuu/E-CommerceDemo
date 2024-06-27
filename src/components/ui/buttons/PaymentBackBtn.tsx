import { Button } from "@nextui-org/react";
import React from "react";

interface PaymentBackBtnProps {
  setNum: Function;
  num: number;
}

export default function PaymentBackBtn({ setNum, num }: PaymentBackBtnProps) {
  const handleClickBack = () => {
    setNum(num - 1);
    if (num == 0) {
      setNum(0);
    }
  };

  return (
    <Button
      className="left-0 w-24 bg-warning-500 text-medium font-thin text-white"
      onClick={handleClickBack}
    >
      Back
    </Button>
  );
}
