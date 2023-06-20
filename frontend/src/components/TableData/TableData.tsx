import TableHeader from './TableHeader';
import TableRows from './TableRows';

export interface TableColumn<T, K extends keyof T> {
  key: K;
  header: string;
  width?: number;
}

interface TableProps<T, K extends keyof T> {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
}

function Table<T, K extends keyof T>({ data, columns }: TableProps<T, K>) {
  return (
    <table>
      <TableHeader />
      <TableRows />
    </table>
  );
}

export default Table;
