import { TableColumn } from './TableData';

interface TableRowsProps<T, K extends keyof T> {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
}

function TableRows<T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>) {
  const rows = data.map((row) => {
    return (
      <tr>
        {columns.map((column) => {
          return <td>{row[column.key]}</td>;
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}
export default TableRows;
