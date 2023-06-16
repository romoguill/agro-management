import { MdNoteAdd, MdSearch } from 'react-icons/md';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Link } from 'react-router-dom';

interface Supplier {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const demoSupplier: Supplier[] = [
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
  const columnHelper = createColumnHelper<Supplier>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: demoSupplier,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function toggleStatus() {
    // TODO
    return;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
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
          <MdNoteAdd className='text-2xl' />
          <p className='text-xl'>Add New</p>
        </div>
      </div>

      {/* TABLE CONTROLS */}
      <div className='flex gap-6 items-center text-gray-700 font-medium'>
        <div className='rounded-lg bg-white flex justify-between items-center px-2 focus-within:outline focus-within:outline-primary-500/30'>
          <MdSearch className='text-gray-400 text-xl' />
          <input
            type='text'
            placeholder='Search...'
            className='outline-none px-2 py-1'
          />
        </div>
        <label className=''>
          <input type='checkbox' className='mr-2' />
          Show inactive
        </label>
      </div>

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th>{header.id}</th>
              ))}
            </tr>
          ))}
        </thead>
      </table>

      {/* <table className='table table-master-data text-left rounded-xl mt-5 overflow-hidden'>
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
            <td className='text-green-500' onClick={toggleStatus}>
              Active
            </td>
          </tr>
          <tr className='border-t border-gray-200 hover:bg-gray-50'>
            <td>
              <input type='checkbox' />
            </td>
            <td className='font-bold'>Monsanto</td>
            <td>Seeds</td>
            <td className='text-red-500' onClick={toggleStatus}>
              Inactive
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}
export default Suppliers;
