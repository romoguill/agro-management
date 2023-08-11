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
      <th className='w-10 py-3 px-1'>
        <input type='checkbox' />
      </th>
    );
  }

  const headers = columns.map((column) => {
    return (
      <th className='py-3 px-1' style={{ width: `${column.width}%` }}>
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr className='shadow-md shadow-slate-200/70 '>
        {checkableHeader}
        {headers}
      </tr>
    </thead>
  );
}

export default TableHeader;
