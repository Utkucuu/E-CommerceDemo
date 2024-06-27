import React from "react";
import { Pagination } from "@nextui-org/react";

type PaginationControlsProps = {
  page: number;
  pages: number;
  hasSearchFilter: boolean;
  selectedKeys: any;
  itemsLength: number;
  onPageChange: (page: number) => void;
};

export default function PaginationControls({
  page,
  pages,
  hasSearchFilter,
  selectedKeys,
  itemsLength,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <Pagination
        showControls
        classNames={{ cursor: "bg-warning text-white" }}
        color="warning"
        isDisabled={hasSearchFilter}
        page={page}
        total={pages}
        variant="light"
        onChange={onPageChange}
      />
      <span className="text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${itemsLength} selected`}
      </span>
    </div>
  );
}
