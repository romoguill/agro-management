import { DataItem, TableColumn } from './TableData';

interface TableRowsProps<T extends DataItem> {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
  isCheckable?: boolean;
}

function TableRows<T extends DataItem>({
  data,
  columns,
  isCheckable = true,
}: TableRowsProps<T>) {
  let rowCheck: JSX.Element | null = null;

  if (isCheckable) {
    rowCheck = (
      <td>
        <input type='checkbox' />
      </td>
    );
  }

  const rows = data.map((row) => {
    return (
      <tr className='border-t border-gray-200 hover:bg-gray-50'>
        {rowCheck}
        {columns.map((column) => {
          return <td>{column.render(row)}</td>;
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}
export default TableRows;
