import React from "react";
import { Chip, Spinner } from "@nextui-org/react";
import { CheckIcon, RejectedIcon } from "../../../public/icon";

interface MessageProps {
  message: string;
  errMessage: string;
}

const Message = ({ message, errMessage }: MessageProps) => {
  return (
    <div className="">
      {" "}
      {(message && (
        <div className="mt-3 flex items-center justify-center gap-y-4 text-xs">
          <Chip
            startContent={<CheckIcon height={20} width={20} size={20} />}
            variant="light"
            color="success"
          >
            {message}
            <Spinner color="success" size="sm" className="mr-2" />
          </Chip>
        </div>
      )) ||
        (errMessage && (
          <div className="mt-3 flex items-center justify-center gap-y-4 text-xs">
            <Chip
              startContent={<RejectedIcon />}
              variant="light"
              color="danger"
            >
              {errMessage}
            </Chip>
          </div>
        )) || (
          <div className="mx-auto mt-3 flex flex-col justify-start text-xs font-bold text-slate-300">
            <div>
              <span className="text-slate-400">Card number: </span>4242 4242
              4242 4242
            </div>
            <div>
              <span className="text-slate-400">MM/YY:</span> 02/42
              <span className="ms-1 text-slate-400">CVC:</span> 242
              <span className="ms-1 text-slate-400">ZIP:</span> 42424
            </div>
          </div>
        )}
    </div>
  );
};

export default Message;
