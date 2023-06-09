import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

interface SupplierRow {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const demoSupplier: SupplierRow[] = [
  {
    name: 'YPF',
    description: 'Fertilizers and herbicides',
    status: 'Active',
  },
  {
    name: 'Monsanto',
    description: 'Seeds',
    status: 'Inactive',
  },
];

function Suppliers() {
  const columnHelper = createColumnHelper<SupplierRow>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: demoSupplier,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <h1 className='text-4xl'>Suppliers</h1>
      <table className='table table-master-data text-left rounded-xl mt-5 overflow-hidden'>
        <thead className='border-b-2 border-gray-400 text-lg'>
          <tr>
            <th className='w-3'>
              <input type='checkbox' />
            </th>
            <th>Name</th>
            <th>Description</th>
            <th className='w-36'>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-t border-gray-200 hover:bg-gray-50'>
            <td>
              <input type='checkbox' />
            </td>
            <td className='font-bold'>YPF</td>
            <td>Fertilizers and herbicides</td>
            <td className='text-emerald-600'>Active</td>
          </tr>
          <tr className='border-t border-gray-200 hover:bg-gray-50'>
            <td>
              <input type='checkbox' />
            </td>
            <td className='font-bold'>Monsanto</td>
            <td>Seeds</td>
            <td className='text-red-500'>Inactive</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default Suppliers;
