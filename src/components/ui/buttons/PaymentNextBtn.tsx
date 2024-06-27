import { Button } from "@nextui-org/react";
import React from "react";

interface PaymentNextBtnProps {
  setNum: Function;
  num: number;
}

export default function PaymentNextBtn({ setNum, num }: PaymentNextBtnProps) {
  const handleClickNext = () => {
    setNum(num + 1);
    if (num == 2) {
      setNum(0);
    }
  };

  return (
    <Button
      className="w-24 bg-warning-500 text-medium font-thin text-white"
      onClick={handleClickNext}
    >
      Next
    </Button>
  );
}
