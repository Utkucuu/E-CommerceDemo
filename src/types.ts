import { Key } from "@react-types/shared";

export interface City {
  name: string;
}

export interface State {
  name: string;
  cities: string[];
}

export interface Country {
  code: string;
  name: string;
  states: State[];
}

export interface CountriesData {
  countries: Country[];
}

export type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  products: any[];
  amount: number;
  status: string;
  summary: string;
  open_address: string;
};

export type Columns = {
  name: string;
  uid: string;
  sortable?: boolean;
};

export type StatusOptions = {
  name: string;
  uid: string;
};

export type SortDescriptor = {
  column: string;
  direction: "ascending" | "descending";
};

export type RenderCellProps = {
  order: Order;
  columnKey: React.Key;
};

export type Selection = "all" | Set<Key>;
