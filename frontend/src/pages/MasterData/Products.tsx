import useAuthContext from '@/hooks/useAuthContext';
import {
  MasterDataEntities,
  ProductWithId,
  SupplierWithId,
} from '@/ts/interfaces';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { SpinnerCircularFixed } from 'spinners-react';
import BreadCrumb from '../../components/BreadCrumb';
import TableActions from '../../components/TableData/TableActions';
import Table, { TableColumn } from '../../components/TableData/TableData';

const columns: TableColumn<ProductWithId>[] = [
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
    render: (item: ProductWithId) => (
      <td
        key={'status'}
        className={item.status === 'Active' ? 'text-green-500' : 'text-red-500'}
      >
        {item.status}
      </td>
    ),
  },
];

function Products() {
  const { auth } = useAuthContext();

  const getProducts = async () => {
    const response = await axios.get('/api/products', {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });
    return response.data;
  };

  const { data, isLoading, isError } = useQuery<ProductWithId[], AxiosError>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  return (
    <div>
      <BreadCrumb
        location='products'
        mainLevelName='Master Data'
        mainLevelPath='master-data'
      />

      <TableActions addEntity={MasterDataEntities.PRODUCTS} />

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

      {isError && (
        <p className='font-semibold text-slate-700 text-center my-2'>
          Oops! There was an error while getting data
        </p>
      )}

      {!isError && data && (
        <Table<ProductWithId>
          data={data}
          columns={columns}
          className='text-left rounded-xl mt-4 overflow-hidden'
          isCheckable={true}
        />
      )}

      {!isError && data?.length === 0 && (
        <p className='font-semibold text-slate-700 text-center my-2'>
          No items to display. Try adding a new one.
        </p>
      )}
    </div>
  );
}

export default Products;
