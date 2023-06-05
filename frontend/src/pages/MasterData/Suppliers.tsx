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
    </div>
  );
}
export default Suppliers;

{
  /* <table className='table'>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>YPF</td>
      <td>Fertilizers and herbicides</td>
    </tr>
    <tr>
      <td>Monsanto</td>
      <td>Seeds</td>
    </tr>
  </tbody>
</table> */
}
