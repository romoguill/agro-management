import { TableColumn } from './TableData';

interface TableHeaderProps<T, K extends keyof T> {
  columns: Array<TableColumn<T, K>>;
}

function TableHeader<T, K extends keyof T>({
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
