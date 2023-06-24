import { MdNoteAdd, MdSearch } from 'react-icons/md';
import BreadCrumb from '../../components/BreadCrumb';
import Table, { TableColumn } from '../../components/TableData/TableData';

type Supplier = {
  name: string;
  description: string;
  isActive: boolean;
};

const demoSupplier: Supplier[] = [
  {
    name: 'YPF',
    description: 'Fertilizers and herbicides',
    isActive: true,
  },
  {
    name: 'Monsanto',
    description: 'Seeds',
    isActive: false,
  },
];

const columns: TableColumn<Supplier>[] = [
  {
    key: 'name',
    header: 'Name',
    width: 300,
  },
  {
    key: 'description',
    header: 'Description',
    width: 400,
  },
  {
    key: 'isActive',
    header: 'Status',
    width: 100,
    render: (item: Supplier) => (
      <td className={item.isActive ? 'text-green-500' : 'text-red-500'}>
        {item.isActive ? 'Active' : 'Inactive'}
      </td>
    ),
  },
];

function Suppliers() {
  function toggleStatus() {
    // TODO
    return;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <BreadCrumb
          location='suppliers'
          mainLevelName='Master Data'
          mainLevelPath='master-data'
        />
      </div>

      <button className='btn btn-primary'>
        <MdNoteAdd />
        Add New
      </button>

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

      <Table<Supplier>
        data={demoSupplier}
        columns={columns}
        className='table-master-data text-left rounded-xl mt-5 overflow-hidden'
        isCheckable={true}
      />
    </div>
  );
}
export default Suppliers;
