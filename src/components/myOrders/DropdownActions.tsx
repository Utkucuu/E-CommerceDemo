import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../../public/icon";
import { Order } from "@/types";

type DropdownActionsProps = {
  order: Order;
  onView: (order: Order) => void;
};

export default function DropdownActions({
  order,
  onView,
}: DropdownActionsProps) {
  return (
    <div className="relative flex items-center justify-end gap-2">
      <Dropdown className="border-1 border-default-200 bg-background">
        <DropdownTrigger>
          <Button isIconOnly radius="full" size="sm" variant="light">
            <VerticalDotsIcon
              className={"text-warning-500 size-10"}
              width={20}
              height={20}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem className="text-warning-500" onClick={() => onView(order)}>
            View
          </DropdownItem>
          <DropdownItem>Edit</DropdownItem>
          <DropdownItem>Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
