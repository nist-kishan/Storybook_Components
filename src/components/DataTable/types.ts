export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

export type Row = {
  id: number;
  name: string;
  age: number;
};

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
}

export type SortOrder = "asc" | "desc";