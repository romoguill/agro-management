import { MdNoteAdd, MdSearch } from 'react-icons/md';
import BreadCrumb from '../../components/BreadCrumb';
import Table, { TableColumn } from '../../components/TableData/TableData';
import TableActions from '../../components/TableData/TableActions';
import { MasterDataEntities } from '@/ts/interfaces';

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
    width: 30,
  },
  {
    key: 'description',
    header: 'Description',
    width: 60,
  },
  {
    key: 'isActive',
    header: 'Status',
    width: 15,
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
      <BreadCrumb
        location='suppliers'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <TableActions addEntity={MasterDataEntities.SUPPLIERS} />

      <Table<Supplier>
        data={demoSupplier}
        columns={columns}
        className='table-master-data text-left rounded-xl mt-4 overflow-hidden'
        isCheckable={true}
      />
    </div>
  );
}
export default Suppliers;
