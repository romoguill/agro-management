import TableHeader from './TableHeader';
import TableRows from './TableRows';

export interface DataItem {
  [key: string]: React.ReactNode;
}

export interface TableColumn<T extends DataItem, K extends keyof T> {
  key: K;
  header: string;
  width?: number;
}

interface TableProps<T extends DataItem, K extends keyof T> {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
}

function Table<T extends DataItem, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>) {
  return (
    <table>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
}

export default Table;
