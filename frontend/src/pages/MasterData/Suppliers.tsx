import useAuthContext from '@/hooks/useAuthContext';
import { MasterDataEntities, Supplier } from '@/ts/interfaces';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SpinnerCircularFixed } from 'spinners-react';
import BreadCrumb from '../../components/BreadCrumb';
import TableActions from '../../components/TableData/TableActions';
import Table, { TableColumn } from '../../components/TableData/TableData';

type SupplierDisplay = {
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
};

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
    key: 'status',
    header: 'Status',
    width: 15,
    render: (item: Supplier) => (
      <td className={item.status ? 'text-green-500' : 'text-red-500'}>
        {item.status ? 'Active' : 'Inactive'}
      </td>
    ),
  },
];

function Suppliers() {
  const { auth } = useAuthContext();

  const getSuppliers = async () => {
    const response = await axios.get('/api/suppliers', {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery<Supplier[], AxiosError>({
    queryKey: ['suppliers'],
    queryFn: getSuppliers,
  });

  return (
    <div>
      <BreadCrumb
        location='suppliers'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <TableActions addEntity={MasterDataEntities.SUPPLIERS} />

      {isLoading && (
        <SpinnerCircularFixed
          size={30}
          thickness={200}
          style={{
            color: '#d1d5db',
            display: 'block',
            margin: '2rem auto',
          }}
        />
      )}

      {error && (
        <p className='font-semibold text-slate-700 text-center my-2'>
          Oops! There was an error while getting data
        </p>
      )}

      {data && (
        <Table<Supplier>
          data={data}
          columns={columns}
          className='text-left rounded-xl mt-4 overflow-hidden'
          isCheckable={true}
        />
      )}
    </div>
  );
}
export default Suppliers;
