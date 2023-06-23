import { DataItem, TableColumn } from './TableData';

interface TableHeaderProps<T extends DataItem> {
  columns: Array<TableColumn<T>>;
  isCheckable?: boolean;
}

function TableHeader<T extends DataItem>({
  columns,
  isCheckable = true,
}: TableHeaderProps<T>) {
  let checkableHeader: JSX.Element | null = null;

  if (isCheckable) {
    checkableHeader = (
      <th>
        <input type='checkbox' />
      </th>
    );
  }

  const headers = columns.map((column) => {
    return <th>{column.header}</th>;
  });

  return (
    <thead>
      <tr>
        {checkableHeader}
        {headers}
      </tr>
    </thead>
  );
}

export default TableHeader;
