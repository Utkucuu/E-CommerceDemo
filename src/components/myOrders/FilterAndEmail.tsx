import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { ChevronDownIcon, SearchIcon } from "../../../public/icon";
import { capitalize } from "@/utils";
import { StatusOptions, Selection, Columns, Order } from "@/types";
import { IoMailOpenOutline } from "react-icons/io5";
import Link from "next/link";

type SearchAndFilterProps = {
  filterValue: string;
  statusFilter: Selection;
  visibleColumns: Selection;
  columns: any;
  statusOptions: StatusOptions[];
  selectedOrders: Order[];
  onSearchChange: (value: string) => void;
  setStatusFilter: (keys: Selection) => void;
  setVisibleColumns: (keys: Selection) => void;
  setRowsPerPage: (value: number) => void;
};

const createEmailBody = (orders: Order[]) => {
  return (
    orders
      .map(
        (order, index) => `

Order ${index + 1}:
Order ID: ${order.id}
Customer Name: ${order.name}
Email: ${order.email}
Phone: ${order.phone}
Address: ${order.address}
Open Address: ${order.open_address}
Order Date: ${order.date}
Status: ${order.status}
Total Amount: $${order.amount}
`,
      )
      .join("\n---\n") +
    "\n\nYOU CAN DOWNLOAD THE ORDER DETAILS IN PDF FORMAT FROM ACTIONS>VIEW AND ATTACH THEM TO YOUR E-MAIL."
  );
};

export default function FilterAndEmail({
  filterValue,
  statusFilter,
  visibleColumns,
  columns,
  statusOptions,
  selectedOrders,
  onSearchChange,
  setStatusFilter,
  setVisibleColumns,
  setRowsPerPage,
}: SearchAndFilterProps) {
  const emailBody = createEmailBody([...selectedOrders]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-end md:justify-between gap-3">
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[44%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by order id..."
          size="sm"
          startContent={
            <SearchIcon className="text-default-300" width={20} height={20} />
          }
          value={filterValue}
          variant="bordered"
          onClear={() => onSearchChange("")}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3 ">
          <Dropdown>
            <DropdownTrigger className="sm:flex">
              <Button
                color="warning"
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="sm:flex">
              <Button
                color="warning"
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column: Columns) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Link
            href={`mailto:recipient@example.com?subject=Order Details&body=${encodeURIComponent(emailBody)}`}
          >
            <Button
              className={`${selectedOrders.length > 0 ? "bg-warning-500" : "bg-foreground"} text-background`}
              endContent={<IoMailOpenOutline className="text-medium" />}
              size="sm"
              disabled={selectedOrders.length === 0}
            >
              Send Mail ({selectedOrders.length})
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-small text-default-400">
          Total {columns.length} orders
        </span>
        <label className="flex items-center text-small text-default-400">
          Rows per page:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}
