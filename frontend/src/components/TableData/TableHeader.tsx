import { DataItem, TableColumn } from './TableData';

interface TableHeaderProps<T extends DataItem> {
  columns: Array<TableColumn<T>>;
}

function TableHeader<T extends DataItem>({ columns }: TableHeaderProps<T>) {
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
