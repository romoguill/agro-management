import { MdNoteAdd } from 'react-icons/md';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';

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
      <div className='flex justify-between items-baseline'>
        <h1 className='text-2xl/none font-section-title font-bold text-gray-800'>
          <span className='text-xl text-gray-600 pr-2'>
            <Link to='/master-data' className='hover:text-primary pr-2'>
              Master Data
            </Link>
            /
          </span>
          SUPPLIERS
        </h1>
        <div
          className='flex gap-2 justify-between items-center text-primary rounded-xl 
          bg-gray-100 px-3 py-2 font-semibold'
        >
          <MdNoteAdd className='text-3xl' />
          <p className='text-xl'>Add New</p>
        </div>
      </div>
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
