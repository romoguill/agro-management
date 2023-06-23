import { DataItem, TableColumn } from './TableData';

interface TableRowsProps<T extends DataItem> {
  data: Array<T>;
  columns: Array<TableColumn<T>>;
}

function TableRows<T extends DataItem>({ data, columns }: TableRowsProps<T>) {
  const rows = data.map((row) => {
    return (
      <tr className='border-t border-gray-200 hover:bg-gray-50'>
        {columns.map((column) => {
          return <td>{row[column.key]}</td>;
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}
export default TableRows;
