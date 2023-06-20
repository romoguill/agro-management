import { DataItem, TableColumn } from './TableData';

interface TableHeaderProps<T extends DataItem, K extends keyof T> {
  columns: Array<TableColumn<T, K>>;
}

function TableHeader<T extends DataItem, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>) {
  const headers = columns.map((column) => {
    return <th>{column.header}</th>;
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
}

export default TableHeader;
