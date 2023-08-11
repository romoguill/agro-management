import { cn } from '@/lib/utils';
import TableHeader from './TableHeader';
import TableRows from './TableRows';

export type DataItem = {
  _id: string;
  [key: string]: React.ReactNode;
};

export interface TableColumn<T extends DataItem> {
  key: keyof T;
  header: string;
  // render is for overriding the default <td></td> component
  render?: (item: T) => React.ReactNode;
  width?: number;
}

interface TableProps<T extends DataItem> {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
  className?: string;
  isCheckable?: boolean;
}

function Table<T extends DataItem>({
  data,
  columns,
  className,
  isCheckable = true,
}: TableProps<T>) {
  return (
    <table className={cn('text-left', className)}>
      <TableHeader<T> columns={columns} isCheckable={isCheckable} />
      <TableRows<T> data={data} columns={columns} isCheckable={isCheckable} />
    </table>
  );
}

export default Table;
