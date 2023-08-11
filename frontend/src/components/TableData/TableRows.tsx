import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleRowSelect = (id: string) => {
    navigate(`./${id}`, { relative: 'path' });
  };

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
      <tr
        key={row._id}
        className='border-t border-gray-200 hover:bg-gray-50 cursor-pointer'
        onClick={() => handleRowSelect(row._id)}
      >
        {rowCheck}
        {columns.map((column) => {
          if (column.render) {
            return column.render(row);
          }

          return (
            <td key={column.header} className='py-2 px-1'>
              {row[column.key]}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}
export default TableRows;
