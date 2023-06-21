import TableHeader from './TableHeader';
import TableRows from './TableRows';

export interface DataItem {
  [key: string]: React.ReactNode;
}

export interface TableColumn<T extends DataItem> {
  key: keyof T;
  header: string;
  width?: number;
}

interface TableProps<T extends DataItem> {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
}

function Table<T extends DataItem>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <TableHeader<T> columns={columns} />
      <TableRows<T> data={data} columns={columns} />
    </table>
  );
}

export default Table;
