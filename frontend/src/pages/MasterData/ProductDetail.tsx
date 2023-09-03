import { useProduct } from '@/apis/products.api';
import BreadCrumb from '@/components/BreadCrumb';
import ProductForm from '@/components/MasterData/ProductForm';
import SupplierForm from '@/components/MasterData/SupplierForm';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { MdModeEditOutline, MdOutlineEditOff } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { SpinnerCircularFixed } from 'spinners-react';

function ProductDetail() {
  const [mode, setMode] = useState<'view' | 'update'>('view');

  const toggleMode = useCallback(
    () => setMode((prevState) => (prevState === 'update' ? 'view' : 'update')),
    []
  );

  const { _id } = useParams();

  const { data, isLoading, isError } = useProduct(_id);

  return (
    <div>
      <div className='flex justify-between'>
        <BreadCrumb
          location='Detail'
          mainLevelName='Master Data'
          mainLevelPath='master-data'
        />
        <Button
          className='gap-2 mt-1'
          variant={mode === 'view' ? 'action' : 'destructive'}
          onClick={toggleMode}
        >
          {mode === 'view' ? (
            <>
              <MdModeEditOutline className={'text-xl'} />
              Edit
            </>
          ) : (
            <>
              <MdOutlineEditOff className={'text-xl'} />
              Cancel
            </>
          )}
        </Button>
      </div>

      <section className='mt-5'>
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
          <ProductForm mode={mode} data={data} toggleMode={toggleMode} />
        )}
      </section>
    </div>
  );
}

export default ProductDetail;
