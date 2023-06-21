import { DataItem, TableColumn } from './TableData';

interface TableRowsProps<T extends DataItem> {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
}

function TableRows<T extends DataItem>({ data, columns }: TableRowsProps<T>) {
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
