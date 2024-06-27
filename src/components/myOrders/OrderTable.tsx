import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { Order, Columns } from "@/types";

type OrderTableProps = {
  columns: Columns[];
  items: Order[];
  sortedItems: Order[];
  headerColumns: Columns[];
  renderCell: (order: Order, columnKey: React.Key) => JSX.Element;
  onSortChange: (descriptor: any) => void;
  onSelectionChange: (keys: any) => void;
  selectedKeys: any;
  sortDescriptor: any;
};

export default function OrderTable({
  sortedItems,
  headerColumns,
  renderCell,
  onSortChange,
  onSelectionChange,
  selectedKeys,
  sortDescriptor,
}: OrderTableProps) {
  return (
    <div className="max-w-screen-xl overflow-x-auto">
      {" "}
      <Table
        isCompact
        removeWrapper
        selectionMode={"multiple"}
        color="warning"
        aria-label="Example table with custom cells, pagination and sorting"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-warning text-background",
          },
        }}
        classNames={{
          wrapper: ["max-h-[382px]", "max-w-3xl"],
          th: [
            "bg-transparent",
            "text-default-500",
            "border-b",
            "border-divider",
          ],
          td: [
            "group-data-[first=true]:first:before:rounded-none",
            "group-data-[first=true]:last:before:rounded-none",
            "group-data-[middle=true]:before:rounded-none",
            "group-data-[last=true]:first:before:rounded-none",
            "group-data-[last=true]:last:before:rounded-none",
          ],
        }}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              className={column.uid === "actions" ? "text-right" : ""}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No order found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
