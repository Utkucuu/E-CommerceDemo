import React from "react";
import { useDisclosure } from "@nextui-org/react";
import { statusColorMap, statusOptions } from "@/utils";
import { Order, Columns, SortDescriptor, Selection } from "@/types";
import OrderTable from "./OrderTable";
import FilterAndEmail from "./FilterAndEmail";
import PaginationControls from "./PaginationControls";
import OrderModal from "./OrderModal";
import { Chip } from "@nextui-org/react";
import DropdownActions from "./DropdownActions";

const columns: Columns[] = [
  { name: "ORDER ID", uid: "id" },
  { name: "CARD HOLDER NAME", uid: "name" },
  { name: "PHONE", uid: "phone" },
  { name: "ADDRESS", uid: "address" },
  { name: "DATE", uid: "date", sortable: true },
  { name: "TOTAL AMOUNT", uid: "amount", sortable: true },
  { name: "SUMMARY", uid: "summary" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS: string[] = [
  "id",
  "name",
  "amount",
  "status",
  "actions",
  "summary",
  "date",
];

type MyOrdersProps = {
  orders: Order[];
};

export default function MyOrders({ orders }: MyOrdersProps) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "date",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const pages = Math.ceil(orders.length / rowsPerPage);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      (visibleColumns as Set<string>).has(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrders = [...orders];
    if (hasSearchFilter) {
      filteredOrders = filteredOrders.filter((order) =>
        order.id.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredOrders = filteredOrders.filter((user) =>
        (statusFilter as Set<string>).has(user.status),
      );
    }

    return filteredOrders;
  }, [orders, filterValue, statusFilter, hasSearchFilter]);

  const selectedKeysSet = new Set(selectedKeys);
  const selectedOrders = orders.filter((order) =>
    selectedKeysSet.has(order.id),
  );

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Order];
      const second = b[sortDescriptor.column as keyof Order];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? cmp : -cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (order: Order, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof Order];

      switch (columnKey) {
        case "name":
          return (
            <div>
              <div>{cellValue}</div>
              <div className="text-xs">{order.email}</div>
            </div>
          );
        case "summary":
        case "phone":
        case "address":
        case "date":
          return <>{cellValue}</>;
        case "amount":
          return <>${cellValue}</>;
        case "status":
          return (
            <Chip
              className="gap-1 border-none capitalize text-default-600"
              color={statusColorMap[order.status]}
              size="sm"
              variant="dot"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <DropdownActions
              order={order}
              onView={(order) => {
                setSelectedOrder(order);
                onOpen();
              }}
            />
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [onOpen],
  );

  return (
    <>
      <FilterAndEmail
        filterValue={filterValue}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        columns={columns}
        statusOptions={statusOptions}
        onSearchChange={setFilterValue}
        setStatusFilter={setStatusFilter}
        setVisibleColumns={setVisibleColumns}
        setRowsPerPage={setRowsPerPage}
        selectedOrders={selectedOrders}
      />
      <OrderTable
        columns={columns}
        items={items}
        sortedItems={sortedItems}
        headerColumns={headerColumns}
        renderCell={renderCell}
        onSortChange={setSortDescriptor}
        onSelectionChange={setSelectedKeys}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
      />
      <PaginationControls
        page={page}
        pages={pages}
        hasSearchFilter={hasSearchFilter}
        selectedKeys={selectedKeys}
        itemsLength={items.length}
        onPageChange={setPage}
      />
      {selectedOrder && (
        <OrderModal isOpen={isOpen} onClose={onClose} order={selectedOrder} />
      )}
    </>
  );
}
